import {defineType, defineField} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings', title: 'Site settings', type: 'document',
  fields: [
    defineField({name: 'companyName', title: 'Company name', type: 'string'}),
    defineField({name: 'heroTitle', title: 'Homepage headline', type: 'string'}),
    defineField({name: 'heroText', title: 'Homepage introduction', type: 'text'}),
    defineField({name: 'contactEmail', title: 'Sales email', type: 'string'}),
    defineField({name: 'heroImage', title: 'Homepage image', type: 'image', options: {hotspot: true}})
  ]
})
