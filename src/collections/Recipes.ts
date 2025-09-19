import type { CollectionConfig } from 'payload'

export const Recipes: CollectionConfig = {
  slug: 'recipes',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'difficulty', 'cookingTime', 'status', 'publishedAt'],
    group: 'Content Management',
    pagination: {
      defaultLimit: 20,
    },
  },
  access: {
    read: ({ req: { user } }) => {
      // Published recipes can be read by anyone
      // Draft recipes only by authenticated users
      if (user) return true
      return {
        status: { equals: 'published' },
      }
    },
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Genel Bilgiler',
          fields: [
            {
              name: 'title',
              label: 'Tarif Adı',
              type: 'text',
              required: true,
              minLength: 3,
              maxLength: 100,
              admin: {
                placeholder: 'Örn: Klasik Mercimek Çorbası',
                description: 'Tarifin ana başlığı',
              },
              validate: (value: unknown) => {
                if (typeof value !== 'string') return 'Tarif adı metin olmalıdır.'
                if (/^\s+$/.test(value)) return 'Tarif adı sadece boşluk olamaz.'
                if (/ {2,}/.test(value)) return 'Tarif adı ardışık boşluklar içeremez.'
                if (!/^[\p{L}\p{N} _.,()-]+$/u.test(value))
                  return 'Tarif adı geçersiz karakterler içeriyor.'
                return true
              },
            },
            {
              name: 'description',
              label: 'Kısa Açıklama',
              type: 'richText',
              required: true,
              admin: {
                description: 'Tarifin özet açıklaması (arama sonuçlarında görünür)',
              },
            },
            {
              name: 'category',
              label: 'Kategori',
              type: 'relationship',
              relationTo: 'categories',
              required: true,
              admin: {
                description: 'Tarifin ait olduğu ana kategori',
              },
            },
            {
              name: 'tags',
              label: 'Etiketler',
              type: 'array',
              fields: [
                {
                  name: 'tag',
                  type: 'text',
                  admin: {
                    placeholder: 'vegetarian, glutensiz, kolay',
                  },
                },
              ],
              admin: {
                description: 'Tarif için etiketler (vegetarian, glutensiz, vs.)',
              },
            },
          ],
        },
        {
          label: 'Media',
          fields: [
            {
              name: 'image16x9',
              label: '16:9 Görsel',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Yatay görsel (1920x1080) - Hero, banner kullanımı için',
              },
            },
            {
              name: 'image1x1',
              label: '1:1 Görsel',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Kare görsel (1080x1080) - Kart, grid kullanımı için (zorunlu)',
              },
            },
            {
              name: 'image1x2',
              label: '1:2 Görsel',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Dikey görsel (1080x2160) - Mobile, story kullanımı için',
              },
            },
            {
              name: 'gallery',
              label: 'Galeri Görselleri',
              type: 'array',
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
                {
                  name: 'caption',
                  label: 'Açıklama',
                  type: 'text',
                  admin: {
                    placeholder: 'Bu görselin açıklaması',
                  },
                },
                {
                  name: 'isStepImage',
                  label: 'Adım Görseli mi?',
                  type: 'checkbox',
                  defaultValue: false,
                  admin: {
                    description: 'Bu görsel pişirme adımlarından biri mi?',
                  },
                },
              ],
              admin: {
                description: 'Tarif için ek görseller (adım adım fotoğraflar, vs.)',
              },
            },
            {
              name: 'videoUrl',
              label: 'Video URL',
              type: 'text',
              admin: {
                placeholder: 'https://youtube.com/watch?v=...',
                description: 'YouTube, Vimeo veya diğer video platformu linki',
              },
              validate: (value: unknown) => {
                if (!value) return true
                if (typeof value !== 'string') return 'Video URL metin olmalıdır.'
                try {
                  new URL(value)
                  return true
                } catch {
                  return 'Geçerli bir URL girin.'
                }
              },
            },
            {
              name: 'thumbnailImage',
              label: 'Video Küçük Resmi',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Video için özel küçük resim (opsiyonel)',
              },
            },
          ],
        },
        {
          label: 'Tarif Detayları',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'servings',
                  label: 'Kaç Kişilik',
                  type: 'number',
                  required: true,
                  min: 1,
                  max: 50,
                  defaultValue: 4,
                  admin: {
                    width: '25%',
                    description: 'Bu tarif kaç kişi için?',
                  },
                },
                {
                  name: 'prepTime',
                  label: 'Hazırlık Süresi (dakika)',
                  type: 'number',
                  required: true,
                  min: 0,
                  max: 1440,
                  admin: {
                    width: '25%',
                    description: 'Hazırlık süresi',
                  },
                },
                {
                  name: 'cookingTime',
                  label: 'Pişirme Süresi (dakika)',
                  type: 'number',
                  required: true,
                  min: 0,
                  max: 1440,
                  admin: {
                    width: '25%',
                    description: 'Pişirme süresi',
                  },
                },
                {
                  name: 'totalTime',
                  label: 'Toplam Süre (dakika)',
                  type: 'number',
                  admin: {
                    width: '25%',
                    readOnly: true,
                    description: 'Otomatik hesaplanır',
                  },
                  hooks: {
                    beforeValidate: [
                      ({ data }) => {
                        const prep = data?.prepTime || 0
                        const cooking = data?.cookingTime || 0
                        return prep + cooking
                      },
                    ],
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'difficulty',
                  label: 'Zorluk Seviyesi',
                  type: 'relationship',
                  relationTo: 'difficultyLevels',
                  required: true,
                  admin: {
                    width: '25%',
                    description: 'Tarifin zorluk derecesi',
                  },
                },
                {
                  name: 'cuisine',
                  label: 'Mutfak',
                  type: 'relationship',
                  relationTo: 'cuisines',
                  admin: {
                    width: '25%',
                    description: 'Hangi mutfağa ait?',
                  },
                },
                {
                  name: 'cookingMethod',
                  label: 'Pişirme Yöntemi',
                  type: 'relationship',
                  relationTo: 'cookingMethods',
                  admin: {
                    width: '25%',
                    description: 'Ana pişirme yöntemi',
                  },
                },
                {
                  name: 'season',
                  label: 'Mevsim',
                  type: 'relationship',
                  relationTo: 'seasons',
                  admin: {
                    width: '25%',
                    description: 'Hangi mevsimde ideal?',
                  },
                },
              ],
            },
            {
              name: 'dietaryInfo',
              label: 'Diyet Bilgileri',
              type: 'array',
              fields: [
                {
                  name: 'diet',
                  type: 'relationship',
                  relationTo: 'dietaryTypes',
                },
              ],
              admin: {
                description: 'Özel diyet gereksinimlerine uygunluk',
              },
            },
          ],
        },
        {
          label: 'Malzemeler',
          fields: [
            {
              name: 'ingredients',
              label: 'Malzemeler',
              type: 'array',
              required: true,
              minRows: 1,
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'ingredient',
                      label: 'Malzeme',
                      type: 'relationship',
                      relationTo: 'ingredients',
                      required: true,
                      admin: {
                        width: '40%',
                        description: 'Listeden malzeme seçin veya yeni ekleyin',
                      },
                    },
                    {
                      name: 'amount',
                      label: 'Miktar',
                      type: 'text',
                      required: true,
                      admin: {
                        width: '20%',
                        placeholder: '2, 1/2, 300',
                      },
                    },
                    {
                      name: 'unit',
                      label: 'Birim',
                      type: 'relationship',
                      relationTo: 'ingredientUnits',
                      required: true,
                      admin: {
                        width: '20%',
                      },
                    },
                    {
                      name: 'notes',
                      label: 'Not',
                      type: 'text',
                      admin: {
                        width: '20%',
                        placeholder: 'ince doğranmış, büyük boy',
                      },
                    },
                  ],
                },
                {
                  name: 'isOptional',
                  label: 'İsteğe Bağlı',
                  type: 'checkbox',
                  defaultValue: false,
                  admin: {
                    description: 'Bu malzeme opsiyonel mi?',
                  },
                },
                {
                  name: 'category',
                  label: 'Malzeme Kategorisi',
                  type: 'relationship',
                  relationTo: 'ingredientCategories',
                  admin: {
                    description: 'Malzeme gruplama için',
                  },
                },
              ],
              admin: {
                description: 'Tarif için gerekli tüm malzemeler',
              },
            },
          ],
        },
        {
          label: 'Hazırlanış',
          fields: [
            {
              name: 'instructions',
              label: 'Pişirme Adımları',
              type: 'array',
              required: true,
              minRows: 1,
              fields: [
                {
                  name: 'step',
                  label: 'Adım',
                  type: 'richText',
                  required: true,
                  admin: {
                    description: 'Bu adımda yapılacakları detaylı şekilde açıklayın',
                  },
                },
                {
                  name: 'image',
                  label: 'Adım Görseli',
                  type: 'upload',
                  relationTo: 'media',
                  admin: {
                    description: 'Bu adım için görsel (opsiyonel)',
                  },
                },
                {
                  name: 'duration',
                  label: 'Süre (dakika)',
                  type: 'number',
                  min: 0,
                  admin: {
                    description: 'Bu adımın süresi (opsiyonel)',
                  },
                },
                {
                  name: 'temperature',
                  label: 'Sıcaklık (°C)',
                  type: 'number',
                  min: 0,
                  max: 300,
                  admin: {
                    description: 'Fırın sıcaklığı vs. (opsiyonel)',
                  },
                },
                {
                  name: 'tips',
                  label: 'İpuçları',
                  type: 'textarea',
                  admin: {
                    placeholder: 'Bu adım için özel ipuçları...',
                    description: 'Bu adım için öneriler ve ipuçları',
                  },
                },
              ],
              admin: {
                description: 'Tarifin adım adım hazırlanışı',
              },
            },
            {
              name: 'chefsTips',
              label: 'Şefin Önerileri',
              type: 'richText',
              admin: {
                description: 'Genel ipuçları, alternatifler ve öneriler',
              },
            },
          ],
        },
        {
          label: 'Besin Değerleri',
          fields: [
            {
              name: 'nutrition',
              label: 'Besin Değerleri (Porsiyon Başına)',
              type: 'group',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'calories',
                      label: 'Kalori',
                      type: 'number',
                      min: 0,
                      admin: {
                        width: '25%',
                        description: 'Kalori (kcal)',
                      },
                    },
                    {
                      name: 'protein',
                      label: 'Protein (g)',
                      type: 'number',
                      min: 0,
                      admin: {
                        width: '25%',
                      },
                    },
                    {
                      name: 'carbs',
                      label: 'Karbonhidrat (g)',
                      type: 'number',
                      min: 0,
                      admin: {
                        width: '25%',
                      },
                    },
                    {
                      name: 'fat',
                      label: 'Yağ (g)',
                      type: 'number',
                      min: 0,
                      admin: {
                        width: '25%',
                      },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'fiber',
                      label: 'Lif (g)',
                      type: 'number',
                      min: 0,
                      admin: {
                        width: '25%',
                      },
                    },
                    {
                      name: 'sugar',
                      label: 'Şeker (g)',
                      type: 'number',
                      min: 0,
                      admin: {
                        width: '25%',
                      },
                    },
                    {
                      name: 'sodium',
                      label: 'Sodyum (mg)',
                      type: 'number',
                      min: 0,
                      admin: {
                        width: '25%',
                      },
                    },
                    {
                      name: 'cholesterol',
                      label: 'Kolesterol (mg)',
                      type: 'number',
                      min: 0,
                      admin: {
                        width: '25%',
                      },
                    },
                  ],
                },
              ],
              admin: {
                description: 'Besin değerleri bilgileri (opsiyonel)',
              },
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'seoTitle',
              label: 'SEO Başlık',
              type: 'text',
              maxLength: 60,
              admin: {
                placeholder: 'Klasik Mercimek Çorbası Tarifi | Site Adı',
                description: 'Arama motorlarında görünecek başlık (60 karakter)',
              },
            },
            {
              name: 'seoDescription',
              label: 'SEO Açıklama',
              type: 'textarea',
              maxLength: 160,
              admin: {
                placeholder: 'Evde kolayca yapabileceğiniz nefis mercimek çorbası tarifi...',
                description: 'Arama motorlarında görünecek açıklama (160 karakter)',
              },
            },
            {
              name: 'seoKeywords',
              label: 'SEO Anahtar Kelimeler',
              type: 'array',
              fields: [
                {
                  name: 'keyword',
                  type: 'text',
                  admin: {
                    placeholder: 'mercimek çorbası, çorba tarifi',
                  },
                },
              ],
              admin: {
                description: 'Arama motorları için anahtar kelimeler',
              },
            },
          ],
        },
        {
          label: 'Yönetim',
          fields: [
            {
              name: 'slug',
              label: 'URL Slug',
              type: 'text',
              unique: true,
              admin: {
                placeholder: 'klasik-mercimek-corbasi',
                description: "URL'de kullanılacak benzersiz kimlik",
              },
              hooks: {
                beforeValidate: [
                  ({ value, data }) => {
                    if (!value && data?.title) {
                      return data.title
                        .toLowerCase()
                        .replace(/ğ/g, 'g')
                        .replace(/ü/g, 'u')
                        .replace(/ş/g, 's')
                        .replace(/ı/g, 'i')
                        .replace(/ö/g, 'o')
                        .replace(/ç/g, 'c')
                        .replace(/[^a-z0-9\s-]/g, '')
                        .replace(/\s+/g, '-')
                        .trim('-')
                    }
                    return value?.toLowerCase().trim()
                  },
                ],
              },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'status',
                  label: 'Durum',
                  type: 'select',
                  required: true,
                  options: [
                    { label: 'Taslak', value: 'draft' },
                    { label: 'Yayında', value: 'published' },
                    { label: 'Arşivlendi', value: 'archived' },
                  ],
                  defaultValue: 'draft',
                  admin: {
                    width: '25%',
                    description: 'Tarifin yayın durumu',
                  },
                },
                {
                  name: 'featured',
                  label: 'Öne Çıkarılsın mı?',
                  type: 'checkbox',
                  defaultValue: false,
                  admin: {
                    width: '25%',
                    description: 'Ana sayfada öne çıkarılsın mı?',
                  },
                },
                {
                  name: 'allowComments',
                  label: 'Yorumlara İzin Ver',
                  type: 'checkbox',
                  defaultValue: true,
                  admin: {
                    width: '25%',
                    description: 'Kullanıcılar yorum yapabilsin mi?',
                  },
                },
                {
                  name: 'allowRating',
                  label: 'Puanlamaya İzin Ver',
                  type: 'checkbox',
                  defaultValue: true,
                  admin: {
                    width: '25%',
                    description: 'Kullanıcılar puan verebilsin mi?',
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'publishedAt',
                  label: 'Yayın Tarihi',
                  type: 'date',
                  admin: {
                    width: '50%',
                    description: 'Tarifin yayınlanma tarihi',
                  },
                },
                {
                  name: 'author',
                  label: 'Yazar',
                  type: 'relationship',
                  relationTo: 'users',
                  admin: {
                    width: '50%',
                    description: 'Tarifi yazan kişi',
                  },
                },
              ],
            },
            {
              name: 'notes',
              label: 'Editör Notları',
              type: 'textarea',
              admin: {
                description: 'Sadece editörler için notlar (kullanıcılara görünmez)',
              },
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    beforeValidate: [
      ({ data }) => {
        // Auto-generate slug if not provided
        if (!data?.slug && data?.title) {
          data.slug = data.title
            .toLowerCase()
            .replace(/ğ/g, 'g')
            .replace(/ü/g, 'u')
            .replace(/ş/g, 's')
            .replace(/ı/g, 'i')
            .replace(/ö/g, 'o')
            .replace(/ç/g, 'c')
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .trim('-')
        }

        // Auto-calculate total time
        if (data?.prepTime && data?.cookingTime) {
          data.totalTime = data.prepTime + data.cookingTime
        }

        // Set published date if status is published and no date is set
        if (data?.status === 'published' && !data?.publishedAt) {
          data.publishedAt = new Date().toISOString()
        }
      },
    ],
  },
}
