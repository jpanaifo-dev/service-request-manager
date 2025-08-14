export interface SectionElement {
  section: SectionSection
  menus: MenuElement[]
}

export interface MenuElement {
  menu: SubmenuElement
  submenus: SubmenuElement[]
}

export interface SubmenuElement {
  id: number
  name: string
  description: string
  icon: null | string
  url: null | string
}

export interface SectionSection {
  id: number
  name: string
}

export interface IMoreApp {
  title: string
  description: string
  icon: string
  url: string
  category?: string
  isNew?: boolean
  isPopular?: boolean
}
