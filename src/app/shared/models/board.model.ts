import { Row } from './row.model';

export interface Board {
	id?: string;
	rows: Row[];
	roomId?: string;
}
