export interface ResourceLink {
  label: string
  url: string
}

export interface ResourceLinks {
  sheets: ResourceLink
  canva: ResourceLink
  pdf: ResourceLink
}

export const RESOURCE_LINKS: ResourceLinks = {
  sheets: {
    label: 'Google Sheets Tracker',
    url: 'https://docs.google.com/spreadsheets/d/your-sheet-id/edit',
  },
  canva: {
    label: 'Canva Template Kit',
    url: 'https://www.canva.com/design/your-design-id/view',
  },
  pdf: {
    label: "Manager's PDF Guide",
    url: 'https://example.com/recognition-engine-guide.pdf',
  },
}
