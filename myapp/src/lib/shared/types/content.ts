
interface NavigationDropdownType {
	title: string;
	description: string;
}

export interface NavigationOptionsType {
	title: string;
	dropdown: NavigationDropdownType[];
}

export interface WebsiteContentType {
	title: string;
	type: string;
	children: WebsiteContentType[];
}

