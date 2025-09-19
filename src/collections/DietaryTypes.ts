import type { CollectionConfig } from 'payload'

export const DietaryTypes: CollectionConfig = {
  slug: 'dietaryTypes',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'isHealthBased', 'isActive'],
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
              label: 'Diyet Türü',
              type: 'text',
              required: true,
              unique: true,
              admin: {
                placeholder: 'Örn: Vegetaryen, Vegan, Glutensiz, Keto',
                description: 'Diyet türünün adı',
              },
            },
            {
              name: 'description',
              label: 'Açıklama',
              type: 'richText',
              admin: {
                description: 'Bu diyet türü hakkında detaylı açıklama',
              },
            },
            {
              name: 'category',
              label: 'Kategori',
              type: 'select',
              options: [
                { label: 'Beslenme Kısıtlaması', value: 'dietary-restriction' },
                { label: 'Sağlık Diyeti', value: 'health-diet' },
                { label: 'Yaşam Tarzı', value: 'lifestyle' },
                { label: 'Alerji/İntolerans', value: 'allergy-intolerance' },
                { label: 'Dini/Kültürel', value: 'religious-cultural' },
              ],
              admin: {
                description: 'Diyet türünün kategorisi',
              },
            },
            {
              name: 'allowedIngredients',
              label: 'İzin Verilen Malzemeler',
              type: 'array',
              fields: [
                {
                  name: 'ingredient',
                  type: 'text',
                  admin: {
                    placeholder: 'sebze, meyve, tahıl',
                  },
                },
              ],
              admin: {
                description: 'Bu diyette kullanılabilen malzemeler',
              },
            },
            {
              name: 'forbiddenIngredients',
              label: 'Yasak Malzemeler',
              type: 'array',
              fields: [
                {
                  name: 'ingredient',
                  type: 'text',
                  admin: {
                    placeholder: 'et, süt, gluten',
                  },
                },
              ],
              admin: {
                description: 'Bu diyette kullanılamayan malzemeler',
              },
            },
            {
              name: 'benefits',
              label: 'Faydaları',
              type: 'array',
              fields: [
                {
                  name: 'benefit',
                  type: 'text',
                  admin: {
                    placeholder: 'kilo verme, kalp sağlığı, sindirim',
                  },
                },
              ],
              admin: {
                description: 'Bu diyetin potansiyel faydaları',
              },
            },
            {
              name: 'isHealthBased',
              label: 'Sağlık Temelli mi?',
              type: 'checkbox',
              defaultValue: false,
              admin: {
                description: 'Bu diyet sağlık nedeniyle mi yapılır?',
              },
            },
            {
              name: 'isAllergyBased',
              label: 'Alerji Temelli mi?',
              type: 'checkbox',
              defaultValue: false,
              admin: {
                description: 'Bu diyet alerji/intolerans nedeniyle mi?',
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
                description: 'Diyet türünü temsil eden ana görsel',
              },
            },
            {
              name: 'icon',
              label: 'İkon',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Diyet türü için ikon',
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
                description: 'Aktif diyet türleri tariflerde kullanılabilir',
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
                placeholder: 'Vegetaryen Tarifler | Site Adı',
                description: 'Arama motorlarında görünecek başlık (60 karakter)',
              },
            },
            {
              name: 'seoDescription',
              label: 'SEO Açıklama',
              type: 'textarea',
              maxLength: 160,
              admin: {
                placeholder: 'Sağlıklı ve lezzetli vegetaryen tarif önerileri...',
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
                    placeholder: 'vegetaryen tarif, sağlıklı beslenme',
                  },
                },
              ],
              admin: {
                description: 'Arama motorları için anahtar kelimeler',
              },
            },
          ],
        },
      ],
    },
  ],
}
