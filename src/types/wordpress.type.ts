import { WPLink } from '@/types/acf-wordpress.type'

export type SiteSettingsSocialType = {
  link_instagram: WPLink
  link_facebook: WPLink
  link_tiktok: WPLink
}

export type SiteSettingsResType = {
  data: {
    social: SiteSettingsSocialType
  }
  locale: string
}
