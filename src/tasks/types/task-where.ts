import { SortOrderEnum } from 'src/common/general';

export class WhereByUserId {
  user: {
    id: number;
  };
  status?: string;
  sort?: {
    order?: SortOrderEnum;
    name?: string;
  };
}
