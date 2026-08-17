import {defineType, defineField} from 'sanity'

export const product = defineType({
  name: 'product', title: 'Product', type: 'document',
  fields: [
    defineField({name: 'sku', title: 'SKU', type: 'string', validation: rule => rule.required()}),
    defineField({name: 'name', title: 'Product name', type: 'string', validation: rule => rule.required()}),
    defineField({name: 'category', title: 'Category', type: 'string', options: {list: ['Navigation systems', 'CarPlay', 'Dash cameras']}, validation: rule => rule.required()}),
    defineField({name: 'brand', title: 'Vehicle brand / product type', type: 'string', description: 'Examples: Toyota, Honda, Jeep / Chrysler, GM, Ford, Other, Adapter, AI box.'}),
    defineField({name: 'fitment', title: 'Vehicle fitment', type: 'string'}),
    defineField({name: 'screenSize', title: 'Screen size', type: 'string'}),
    defineField({name: 'summary', title: 'Short description', type: 'text', rows: 3}),
    defineField({name: 'features', title: 'Key features', type: 'array', of: [{type: 'string'}]}),
    defineField({
      name: 'configurations', title: 'Configurations', type: 'array',
      of: [{type: 'object', fields: [
        defineField({name: 'label', title: 'Label', type: 'string', validation: rule => rule.required()}),
        defineField({name: 'inquiryUrl', title: 'Inquiry link (optional)', type: 'url', description: 'Leave blank to use the sales email link.'})
      ]}]
    }),
    defineField({name: 'listImage', title: 'Catalog image', type: 'image', options: {hotspot: true}}),
    defineField({name: 'detailImage', title: 'Product detail image', type: 'image', options: {hotspot: true}}),
    defineField({name: 'sortOrder', title: 'Sort order', type: 'number'}),
    defineField({name: 'published', title: 'Publish on website', type: 'boolean', initialValue: true})
  ],
  preview: {select: {title: 'sku', subtitle: 'name', media: 'detailImage'}}
})
