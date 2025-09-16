import type { CollectionConfig } from 'payload'

export const IngredientUnits: CollectionConfig = {
  slug: 'ingredientUnits',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'symbol', 'category', 'isActive'],
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
              label: 'Birim Adı',
              type: 'text',
              required: true,
              unique: true,
              admin: {
                placeholder: 'Örn: Çay Kaşığı, Gram, Adet',
                description: 'Birimin tam adı',
              },
            },
            {
              name: 'symbol',
              label: 'Kısaltma',
              type: 'text',
              required: true,
              admin: {
                placeholder: 'Örn: çk, g, adet',
                description: 'Birimin kısa gösterimi',
              },
            },
            {
              name: 'category',
              label: 'Kategori',
              type: 'select',
              required: true,
              options: [
                { label: 'Ağırlık', value: 'weight' },
                { label: 'Hacim', value: 'volume' },
                { label: 'Adet', value: 'piece' },
                { label: 'Ölçü', value: 'measure' },
              ],
              admin: {
                description: 'Birimin türü',
              },
            },
            {
              name: 'description',
              label: 'Açıklama',
              type: 'textarea',
              admin: {
                placeholder: 'Bu birim hakkında kısa açıklama',
                description: 'Birimin kullanımı hakkında bilgi',
              },
            },
            {
              name: 'conversionRate',
              label: 'Dönüşüm Oranı',
              type: 'number',
              admin: {
                placeholder: '1000 (gram için mg cinsinden)',
                description: 'Temel birime dönüştürme oranı (opsiyonel)',
              },
            },
          ],
        },
        {
          label: 'Media',
          fields: [
            {
              name: 'icon',
              label: 'İkon',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Birim için ikon (opsiyonel)',
              },
            },
            {
              name: 'exampleImage',
              label: 'Örnek Görsel',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Birimin nasıl ölçüldüğünü gösteren örnek görsel',
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
                description: 'Aktif birimler tariflerde kullanılabilir',
              },
            },
            {
              name: 'isPrecise',
              label: 'Hassas Ölçüm',
              type: 'checkbox',
              defaultValue: false,
              admin: {
                description: 'Bu birim hassas ölçüm gerektiriyor mu?',
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
                placeholder: 'Gram ile Ölçülen Tarifler | Site Adı',
                description: 'Arama motorlarında görünecek başlık (60 karakter)',
              },
            },
            {
              name: 'seoDescription',
              label: 'SEO Açıklama',
              type: 'textarea',
              maxLength: 160,
              admin: {
                placeholder: 'Gram ile hassas ölçümler gerektiren nefis tarifler...',
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
                    placeholder: 'gram ölçü, hassas tarif, ölçüm',
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
