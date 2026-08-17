import {defineType, defineField} from 'sanity'

export const product = defineType({
  name: 'product', title: 'Product', type: 'document',
  fields: [
    defineField({name: 'sku', title: 'SKU', type: 'string', validation: rule => rule.required()}),
    defineField({name: 'name', title: 'Product name', type: 'string', validation: rule => rule.required()}),
    defineField({name: 'category', title: 'Category', type: 'string', options: {list: ['Navigation systems', 'CarPlay', 'Dash cameras']}}),
    defineField({name: 'fitment', title: 'Vehicle fitment', type: 'string'}),
    defineField({name: 'screenSize', title: 'Screen size', type: 'string'}),
    defineField({name: 'summary', title: 'Short description', type: 'text', rows: 3}),
    defineField({name: 'features', title: 'Key features', type: 'array', of: [{type: 'string'}]}),
    defineField({name: 'configurations', title: 'Configurations', type: 'array', of: [{type: 'string'}]}),
    defineField({name: 'listImage', title: 'Catalog image', type: 'image', options: {hotspot: true}}),
    defineField({name: 'detailImage', title: 'Product detail image', type: 'image', options: {hotspot: true}}),
    defineField({name: 'published', title: 'Publish on website', type: 'boolean', initialValue: true})
  ],
  preview: {select: {title: 'sku', subtitle: 'name', media: 'detailImage'}}
})
