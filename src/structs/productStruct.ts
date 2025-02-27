import {
  string,
  min,
  max,
  enums,
  object,
  array,
  optional,
  integer,
  coerce,
  defaulted,
  partial,
  nonempty,
  refine,
  Infer,
} from 'superstruct';

export const CreateProductRequestStruct = object({
  name: refine(
    coerce(nonempty(string()), string(), (value) => value.trim()),
    '상품명은 10자 이하로 입력해주세요.',
    (value) => value.length <= 10,
  ),
  price: min(integer(), 0),
  description: refine(
    nonempty(string()),
    '상품 설명은 10자 이상 입력해주세요.',
    (value) => value.length >= 10,
  ),
  tags: refine(
    refine(
      array(nonempty(string())),
      '태그는 하나 이상 입력해주세요.',
      (value) => value.length > 0,
    ),
    '각 태그는 5자 이하로 입력해주세요.',
    (value) => value.every((tag) => tag.length <= 5),
  ),
  images: refine(
    array(nonempty(string())),
    '이미지는 하나 이상 입력해주세요.',
    (value) => value.length > 0,
  ),
});

export const EditProductStruct = partial(CreateProductRequestStruct);

export const GetProductListRequestStruct = object({
  page: defaulted(
    refine(
      coerce(min(integer(), 1), string(), (value) => Number.parseInt(value, 10)),
      'page는 1이상의 정수로 입력해주세요.',
      () => true,
    ),
    1,
  ),
  pageSize: defaulted(
    refine(
      coerce(max(min(integer(), 1), 10), string(), (value) => Number.parseInt(value, 10)),
      'pageSize는 1에서 10 사이의 정수로 입력해주세요.',
      () => true,
    ),
    10,
  ),
  orderBy: defaulted(
    refine(
      enums(['recent', 'favorite']),
      'orderBy는 recent,favorite중 하나를 입력해주세요.',
      () => true,
    ),
    'recent',
  ),
  word: optional(nonempty(string())),
});

export type CreateProductRequest = Infer<typeof CreateProductRequestStruct>;
export type EditProductRequest = Infer<typeof EditProductStruct>;
export type GetProductListRequest = Infer<typeof GetProductListRequestStruct>;
