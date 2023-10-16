const depositsKeys = {
  all: ['deposits'] as const,
  details: (id: number) => [...depositsKeys.all, 'detail', id] as const,
};

export default depositsKeys;
