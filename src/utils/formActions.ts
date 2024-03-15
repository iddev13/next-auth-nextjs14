export const focus = (e: React.FocusEvent<HTMLDivElement>, classname: string) => {
	e.currentTarget.classList.add(classname)
}
export const blur = (e: React.FocusEvent<HTMLDivElement>, value: string, classname: string) => {
	if (value === '') e.currentTarget.classList.remove(classname)
}