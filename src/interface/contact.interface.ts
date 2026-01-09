import { IMedia } from '@/interface/media.interface'
import { ILink } from '@/interface/link.interface'

export interface IContactPageACF {
  acf: {
    banner?: {
      title?: string
      background_pc?: IMedia
      background_mobile?: IMedia
    }
    contact_form: {
      title: string
    }
    contact_information: {
      social_network: {
        title: string
        social: {
          icon: IMedia
          link: ILink
        }[]
      }
      email: {
        title: string
        email: string
      }
      telephone_number: {
        title: string
        phone: string
      }
      office_address: {
        title: string
        address: string
      }
      google_map: {
        preview_image: IMedia
        link: ILink
      }
    }
  }
}

