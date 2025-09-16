import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'parent', 'isActive'],
    group: 'Content Management',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Genel Bilgiler',
          fields: [
            {
              name: 'name',
              label: 'Kategori Adı',
              type: 'text',
              required: true,
              minLength: 2,
              maxLength: 50,
              admin: {
                placeholder: 'Örn: Ana Yemek, Tatlı, Çorba',
                description: 'Kategorinin görünür adı',
              },
              validate: (value: unknown) => {
                if (typeof value !== 'string') return 'Kategori adı metin olmalıdır.'
                if (/^\s+$/.test(value)) return 'Kategori adı sadece boşluk olamaz.'
                if (!/^[\p{L}\p{N} _-]+$/u.test(value))
                  return 'Kategori adı sadece harf, rakam, boşluk, tire ve alt çizgi içerebilir.'
                return true
              },
            },
            {
              name: 'description',
              label: 'Açıklama',
              type: 'textarea',
              maxLength: 500,
              admin: {
                placeholder: 'Bu kategori hakkında kısa bir açıklama',
                description: 'Kategorinin açıklaması (SEO için önemli)',
              },
            },
            {
              name: 'parent',
              label: 'Üst Kategori',
              type: 'relationship',
              relationTo: 'categories',
              admin: {
                description: 'Bu kategori bir alt kategori ise üst kategorisini seçin',
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
              required: true,
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
              name: 'icon',
              label: 'İkon',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Kategori için küçük ikon görsel (menülerde kullanılır)',
              },
            },
            {
              name: 'color',
              label: 'Tema Rengi',
              type: 'text',
              admin: {
                placeholder: '#FF5722, #4CAF50, #2196F3',
                description: 'Kategori için tema rengi (hex kod)',
              },
            },
            {
              name: 'gallery',
              label: 'Galeri',
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
              ],
              admin: {
                description: 'Kategori ile ilgili ek görseller',
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
                placeholder: 'ana-yemek, tatli, corba',
                description: "URL'de kullanılacak benzersiz kimlik",
              },
              hooks: {
                beforeValidate: [
                  ({ value, data }) => {
                    if (!value && data?.name) {
                      return data.name
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
              name: 'sortOrder',
              label: 'Sıralama',
              type: 'number',
              defaultValue: 0,
              admin: {
                description: 'Kategorilerin sıralanma düzeni (düşük sayılar önce görünür)',
              },
            },
            {
              name: 'isActive',
              label: 'Aktif',
              type: 'checkbox',
              defaultValue: true,
              admin: {
                description: 'Kategorinin sitede görünür olup olmayacağı',
              },
            },
            {
              name: 'isFeatured',
              label: 'Öne Çıkarılsın mı?',
              type: 'checkbox',
              defaultValue: false,
              admin: {
                description: 'Ana sayfada öne çıkarılsın mı?',
              },
            },
            {
              name: 'recipeCount',
              label: 'Tarif Sayısı',
              type: 'number',
              admin: {
                readOnly: true,
                description: 'Bu kategorideki toplam tarif sayısı (otomatik hesaplanır)',
              },
            },
            {
              name: 'adminNotes',
              label: 'Yönetici Notları',
              type: 'textarea',
              admin: {
                description: 'Sadece yöneticiler için notlar (kullanıcılara görünmez)',
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
                placeholder: 'Ana Yemek Tarifleri | Site Adı',
                description: 'Arama motorlarında görünecek başlık (60 karakter)',
              },
            },
            {
              name: 'seoDescription',
              label: 'SEO Açıklama',
              type: 'textarea',
              maxLength: 160,
              admin: {
                placeholder: 'Nefis ana yemek tarifleri, kolay ve pratik tarifler...',
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
                    placeholder: 'yemek tarifi, ana yemek',
                  },
                },
              ],
              admin: {
                description: 'Arama motorları için anahtar kelimeler',
              },
            },
            {
              name: 'seoImage',
              label: 'SEO Görseli',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Sosyal medyada paylaşılırken kullanılacak görsel',
              },
            },
            {
              name: 'canonicalUrl',
              label: 'Canonical URL',
              type: 'text',
              admin: {
                placeholder: 'https://example.com/kategori/ana-yemek',
                description: 'Bu sayfa için canonical URL (opsiyonel)',
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
        // Ensure slug is generated if not provided
        if (!data?.slug && data?.name) {
          data.slug = data.name
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
      },
    ],
  },
}
