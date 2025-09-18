import type { CollectionConfig } from 'payload'

export const DifficultyLevels: CollectionConfig = {
  slug: 'difficultyLevels',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'level', 'skillRequired', 'isActive'],
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
              label: 'Zorluk Seviyesi',
              type: 'text',
              required: true,
              unique: true,
              admin: {
                placeholder: 'Örn: Kolay, Orta, Zor, Uzman',
                description: 'Zorluk seviyesinin adı',
              },
            },
            {
              name: 'level',
              label: 'Seviye Numarası',
              type: 'number',
              required: true,
              min: 1,
              max: 10,
              admin: {
                description: '1-10 arası zorluk derecesi (1 en kolay, 10 en zor)',
              },
            },
            {
              name: 'description',
              label: 'Açıklama',
              type: 'richText',
              admin: {
                description: 'Bu zorluk seviyesi hakkında açıklama',
              },
            },
            {
              name: 'skillRequired',
              label: 'Gerekli Beceri',
              type: 'richText',
              admin: {
                description: 'Bu seviye için gerekli beceriler ve deneyim',
              },
            },
            {
              name: 'estimatedTime',
              label: 'Tahmini Süre (dakika)',
              type: 'group',
              fields: [
                {
                  name: 'min',
                  label: 'Minimum',
                  type: 'number',
                  min: 0,
                },
                {
                  name: 'max',
                  label: 'Maksimum',
                  type: 'number',
                  min: 0,
                },
              ],
              admin: {
                description: 'Bu zorluk için tahmini süre aralığı',
              },
            },
            {
              name: 'prerequisites',
              label: 'Ön Koşullar',
              type: 'array',
              fields: [
                {
                  name: 'prerequisite',
                  type: 'text',
                  admin: {
                    placeholder: 'temel bıçak kullanımı, ocak deneyimi',
                  },
                },
              ],
              admin: {
                description: 'Bu seviye için gerekli ön koşullar',
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
                description: 'Zorluk seviyesini temsil eden ana görsel',
              },
            },
            {
              name: 'icon',
              label: 'İkon',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Zorluk seviyesi için ikon',
              },
            },
            {
              name: 'badge',
              label: 'Rozet Görseli',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Bu seviyeyi başaran kullanıcılar için rozet',
              },
            },
          ],
        },
        {
          label: 'Yönetim',
          fields: [
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
                description: 'Aktif seviyeler tariflerde kullanılabilir',
              },
            },
            {
              name: 'isVisible',
              label: 'Görünür',
              type: 'checkbox',
              defaultValue: true,
              admin: {
                description: 'Bu seviye kullanıcılara görünür mü?',
              },
            },
            {
              name: 'recommendedFor',
              label: 'Kimler İçin Öneriliyor',
              type: 'select',
              options: [
                { label: 'Yeni Başlayanlar', value: 'beginners' },
                { label: 'Orta Seviye', value: 'intermediate' },
                { label: 'İleri Seviye', value: 'advanced' },
                { label: 'Profesyoneller', value: 'professionals' },
              ],
              admin: {
                description: 'Bu zorluk seviyesi hangi grup için uygun?',
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
                placeholder: 'Kolay Yemek Tarifleri | Site Adı',
                description: 'Arama motorlarında görünecek başlık (60 karakter)',
              },
            },
            {
              name: 'seoDescription',
              label: 'SEO Açıklama',
              type: 'textarea',
              maxLength: 160,
              admin: {
                placeholder: 'Herkesin kolayca yapabileceği pratik ve lezzetli yemek tarifleri...',
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
                    placeholder: 'kolay tarif, pratik yemek, basit tarif',
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
