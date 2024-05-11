export const getPageFromUrl = (url: string): number => {
    return url === ""
    ? 1
    : Number(url.split(/(?:[?&])page=(\d+)/)[1])
}

export const setPageNavigate = (pathname: string, pageNumber?: number) => {
    if(pageNumber){
        return `${pathname}?page=${pageNumber}`
    } else {
        return `${pathname}`
    }
}