export interface SidenavNode {
  name: string,
  routeId?: string | string[],
  route?: string,
  childs?: SidenavNode[],
  disable?: boolean
}
