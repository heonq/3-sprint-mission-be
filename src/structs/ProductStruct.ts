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
    refine(
      array(nonempty(string())),
      '이미지는 하나 이상 입력해주세요.',
      (value) => value.length > 0,
    ),
    '',
    (value) =>
      value.every((image) => {
        try {
          const url = new URL(image);
          return url.protocol === 'https:';
        } catch {
          return false;
        }
      }),
  ),
});

export const EditProductStruct = partial(CreateProductRequestStruct);

export const GetProductListRequestStruct = object({
  skip: defaulted(
    coerce(min(integer(), 0), string(), (value) => Number.parseInt(value, 10)),
    0,
  ),
  take: defaulted(
    coerce(max(min(integer(), 1), 10), string(), (value) => Number.parseInt(value, 10)),
    10,
  ),
  orderBy: optional(enums(['recent', 'favorite'])),
  word: optional(nonempty(string())),
});
