import type { Date } from 'mongoose'

export type IProduct = {
	id: string;
	name: string;
	price: number;
	updateDate?: Date;
}

export type ProductObject = {
	name: string;
	price: number;
}

export type FormattedResponse = {
	code: number;
	data: {
		data: ResponseProductsData;
		errors: string[];
		meta: {
			time: string;
		};
	};
}

// eslint-disable-next-line @typescript-eslint/ban-types
export type ResponseProductsData = IProduct | IProduct[] | undefined | null
