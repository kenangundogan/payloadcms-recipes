import type { CollectionConfig } from 'payload'

export const IngredientCategories: CollectionConfig = {
  slug: 'ingredientCategories',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'parent', 'isActive'],
    group: 'Reference Data',
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
              unique: true,
              admin: {
                placeholder: 'Örn: Et & Balık, Sebze & Meyve, Tahıl & Baklagil',
                description: 'Malzeme kategorisinin adı',
              },
            },
            {
              name: 'description',
              label: 'Açıklama',
              type: 'richText',
              admin: {
                description: 'Bu kategori hakkında açıklama',
              },
            },
            {
              name: 'parent',
              label: 'Üst Kategori',
              type: 'relationship',
              relationTo: 'ingredientCategories',
              admin: {
                description: 'Bu bir alt kategori ise üst kategorisini seçin',
              },
            },
            {
              name: 'storageInstructions',
              label: 'Saklama Talimatları',
              type: 'richText',
              admin: {
                description: 'Bu kategorideki malzemelerin genel saklama koşulları',
              },
            },
            {
              name: 'nutritionalInfo',
              label: 'Beslenme Bilgisi',
              type: 'richText',
              admin: {
                description: 'Bu kategorinin genel beslenme değerleri hakkında bilgi',
              },
            },
            {
              name: 'seasonality',
              label: 'Mevsimsellik',
              type: 'array',
              fields: [
                {
                  name: 'season',
                  type: 'relationship',
                  relationTo: 'seasons',
                },
              ],
              admin: {
                description: 'Bu kategorideki malzemelerin hangi mevsimlerde taze olduğu',
              },
            },
          ],
        },
        {
          label: 'Media',
          fields: [
            {
              name: 'featuredImage',
              label: 'Öne Çıkan Görsel',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Kategoriyi temsil eden ana görsel',
              },
            },
            {
              name: 'icon',
              label: 'İkon',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Kategori için ikon',
              },
            },
            {
              name: 'color',
              label: 'Tema Rengi',
              type: 'text',
              admin: {
                placeholder: '#FF5722, #4CAF50, #FF9800',
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
                description: 'URL için benzersiz kimlik',
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
                description: 'Listeleme sırası (düşük sayılar önce görünür)',
              },
            },
            {
              name: 'isActive',
              label: 'Aktif',
              type: 'checkbox',
              defaultValue: true,
              admin: {
                description: 'Aktif kategoriler tariflerde kullanılabilir',
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
                placeholder: 'Et ve Balık Tarifleri | Site Adı',
                description: 'Arama motorlarında görünecek başlık (60 karakter)',
              },
            },
            {
              name: 'seoDescription',
              label: 'SEO Açıklama',
              type: 'textarea',
              maxLength: 160,
              admin: {
                placeholder: 'Protein açısından zengin et ve balık tarifleri...',
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
                    placeholder: 'et tarifleri, balık tarifleri, protein',
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
          ],
        },
      ],
    },
  ],
}
