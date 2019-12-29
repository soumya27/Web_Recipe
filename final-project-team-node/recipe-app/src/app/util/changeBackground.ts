export function changeBackground (imageUrl: string) {
  (<HTMLInputElement>document.getElementsByClassName("wrapper").item(0)).style.background = imageUrl ;
  (<HTMLInputElement>document.getElementsByClassName("wrapper").item(0)).style.backgroundRepeat = 'no-repeat';
  (<HTMLInputElement>document.getElementsByClassName("wrapper").item(0)).style.backgroundSize = 'cover';
}
