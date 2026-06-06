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
    url: 'https://docs.google.com/spreadsheets/d/1w1xyDVaTOYFZ3qqvM3io0pWkcz4088RH--MyRKabJnA/edit?usp=sharing',
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
