import { IMedia } from "@/interface/media.interface";
import { ILink } from "@/interface/link.interface";

export interface ISiteSetting {
  data: {
    header: IHeader
  }
}

export interface IHeader {
  logo: IMedia
  navigations: {
    select: "parent" | "normal"
    page_link_normal: ILink
    page_link_parent: {
      title: ILink
      link: {
        item: ILink
      }[]
      image: IMedia
    }
  }[]
}

