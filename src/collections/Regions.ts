import type { CollectionConfig } from 'payload'

export const Regions: CollectionConfig = {
  slug: 'regions',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'country', 'type', 'isActive'],
    group: 'Geography',
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
              label: 'Bölge Adı',
              type: 'text',
              required: true,
              admin: {
                placeholder: 'Örn: Ege Bölgesi, Toskana, Andalusia',
                description: 'Bölgenin tam adı',
              },
            },
            {
              name: 'country',
              label: 'Ülke',
              type: 'relationship',
              relationTo: 'countries',
              required: true,
              admin: {
                description: 'Bu bölgenin ait olduğu ülke',
              },
            },
            {
              name: 'type',
              label: 'Bölge Türü',
              type: 'select',
              required: true,
              options: [
                { label: 'Coğrafi Bölge', value: 'geographic' },
                { label: 'İdari Bölge/Eyalet', value: 'administrative' },
                { label: 'Kültürel Bölge', value: 'cultural' },
                { label: 'Ekonomik Bölge', value: 'economic' },
              ],
              admin: {
                description: 'Bu bölgenin kategorisi',
              },
            },
            {
              name: 'description',
              label: 'Açıklama',
              type: 'richText',
              admin: {
                description: 'Bu bölge hakkında detaylı bilgiler',
              },
            },
            {
              name: 'capital',
              label: 'Merkez Şehir',
              type: 'text',
              admin: {
                placeholder: 'İzmir, Floransa, Sevilla',
                description: 'Bölgenin merkez şehri (varsa)',
              },
            },
            {
              name: 'characteristics',
              label: 'Özellikler',
              type: 'array',
              fields: [
                {
                  name: 'characteristic',
                  type: 'text',
                  admin: {
                    placeholder: 'deniz kıyısı, dağlık, tarım bölgesi',
                  },
                },
              ],
              admin: {
                description: 'Bölgenin karakteristik özellikleri',
              },
            },
            {
              name: 'climate',
              label: 'İklim',
              type: 'select',
              options: [
                { label: 'Akdeniz İklimi', value: 'mediterranean' },
                { label: 'Karasal İklim', value: 'continental' },
                { label: 'Okyanus İklimi', value: 'oceanic' },
                { label: 'Tropik İklim', value: 'tropical' },
                { label: 'Çöl İklimi', value: 'desert' },
                { label: 'Kutup İklimi', value: 'polar' },
              ],
              admin: {
                description: 'Bölgenin hakim iklim türü',
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
              name: 'icon',
              label: 'İkon',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Bölge için ikon',
              },
            },
            {
              name: 'color',
              label: 'Tema Rengi',
              type: 'text',
              admin: {
                placeholder: '#3498DB, #E67E22, #9B59B6',
                description: 'Bölge için tema rengi (hex kod)',
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
                description: 'Bölge ile ilgili ek görseller',
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
                description: 'Aktif bölgeler sistemde kullanılabilir',
              },
            },
            {
              name: 'isTouristDestination',
              label: 'Turist Bölgesi',
              type: 'checkbox',
              defaultValue: false,
              admin: {
                description: 'Bu bölge popüler bir turist destinasyonu mu?',
              },
            },
            {
              name: 'cityCount',
              label: 'Şehir Sayısı',
              type: 'number',
              admin: {
                readOnly: true,
                description: 'Bu bölgedeki şehir sayısı (otomatik hesaplanır)',
              },
            },
            {
              name: 'economicActivity',
              label: 'Ana Ekonomik Faaliyet',
              type: 'select',
              options: [
                { label: 'Tarım', value: 'agriculture' },
                { label: 'Turizm', value: 'tourism' },
                { label: 'Sanayi', value: 'industry' },
                { label: 'Hizmet', value: 'services' },
                { label: 'Balıkçılık', value: 'fishing' },
                { label: 'Madencilik', value: 'mining' },
              ],
              admin: {
                description: 'Bölgenin ana ekonomik faaliyeti',
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
                placeholder: 'Ege Bölgesi Yemekleri | Site Adı',
                description: 'Arama motorlarında görünecek başlık (60 karakter)',
              },
            },
            {
              name: 'seoDescription',
              label: 'SEO Açıklama',
              type: 'textarea',
              maxLength: 160,
              admin: {
                placeholder: 'Ege bölgesinin taze deniz ürünleri ile hazırlanan nefis tarifleri...',
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
                    placeholder: 'ege mutfağı, ege yemekleri, deniz ürünleri',
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
