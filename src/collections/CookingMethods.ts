import type { CollectionConfig } from 'payload'

export const CookingMethods: CollectionConfig = {
  slug: 'cookingMethods',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'averageTime', 'isActive'],
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
              label: 'Pişirme Yöntemi',
              type: 'text',
              required: true,
              unique: true,
              admin: {
                placeholder: 'Örn: Fırında, Ocakta, Izgarada',
                description: 'Pişirme yönteminin adı',
              },
            },
            {
              name: 'description',
              label: 'Açıklama',
              type: 'richText',
              admin: {
                description: 'Bu pişirme yöntemi hakkında detaylı açıklama',
              },
            },
            {
              name: 'category',
              label: 'Kategori',
              type: 'select',
              options: [
                { label: 'Sıcak Pişirme', value: 'hot-cooking' },
                { label: 'Soğuk Hazırlama', value: 'cold-preparation' },
                { label: 'Karışık Yöntem', value: 'mixed-method' },
              ],
              admin: {
                description: 'Pişirme yönteminin kategorisi',
              },
            },
            {
              name: 'averageTime',
              label: 'Ortalama Süre (dakika)',
              type: 'number',
              min: 0,
              admin: {
                description: 'Bu yöntem için ortalama pişirme süresi',
              },
            },
            {
              name: 'temperature',
              label: 'Önerilen Sıcaklık (°C)',
              type: 'group',
              fields: [
                {
                  name: 'min',
                  label: 'Minimum',
                  type: 'number',
                  min: 0,
                  max: 300,
                },
                {
                  name: 'max',
                  label: 'Maksimum',
                  type: 'number',
                  min: 0,
                  max: 300,
                },
              ],
              admin: {
                description: 'Bu yöntem için önerilen sıcaklık aralığı',
              },
            },
            {
              name: 'equipment',
              label: 'Gerekli Ekipmanlar',
              type: 'array',
              fields: [
                {
                  name: 'item',
                  type: 'text',
                  admin: {
                    placeholder: 'fırın, tava, ızgara',
                  },
                },
              ],
              admin: {
                description: 'Bu yöntem için gerekli araç gereçler',
              },
            },
            {
              name: 'tips',
              label: 'İpuçları',
              type: 'richText',
              admin: {
                description: 'Bu pişirme yöntemi için öneriler ve ipuçları',
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
                description: 'Pişirme yöntemini temsil eden ana görsel',
              },
            },
            {
              name: 'icon',
              label: 'İkon',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Pişirme yöntemi için ikon',
              },
            },
            {
              name: 'instructionalVideo',
              label: 'Eğitim Videosu',
              type: 'text',
              admin: {
                placeholder: 'https://youtube.com/watch?v=...',
                description: "Bu pişirme yöntemini gösteren video URL'si",
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
                description: 'Aktif yöntemler tariflerde kullanılabilir',
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
              name: 'difficultyRequired',
              label: 'Gereken Zorluk Seviyesi',
              type: 'relationship',
              relationTo: 'difficultyLevels',
              admin: {
                description: 'Bu yöntem için gereken minimum zorluk seviyesi',
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
                placeholder: 'Fırında Pişen Tarifler | Site Adı',
                description: 'Arama motorlarında görünecek başlık (60 karakter)',
              },
            },
            {
              name: 'seoDescription',
              label: 'SEO Açıklama',
              type: 'textarea',
              maxLength: 160,
              admin: {
                placeholder: 'Fırında mükemmel şekilde pişen nefis yemek tarifleri...',
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
                    placeholder: 'fırın tarifi, fırında pişen, pişirme yöntemi',
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
