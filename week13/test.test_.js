function add(a, b) {
	return a + b;
}

it('add', () => {
	const result = add(1, 2);
	expect(result).toBe(3);
});

function combineObjects(obj1, obj2) {
	Object.assign(obj1, obj2);
	return obj1;
	// return {...obj1, ...obj2}; // this would NOT pass the toBe
}

test('correct result', () => {
	const result = combineObjects({ a: 'A' }, { b: 'B' });
	expect(result).toEqual({ a: 'A', b: 'B' });
});

test('should mutate original', () => {
	const obj1 = { a: 'A' };
	const result = combineObjects(obj1, { b: 'B' });
	expect(obj1).toEqual(result);
	expect(obj1).toBe(result);
});

function mockMongoCreate(input) {
	return { _id: Math.PI, ...input };
}

test('another test', () => {
	const result = mockMongoCreate({ one: '1' });
    console.log(result);
	expect(result).toMatchObject({ one: '1' });
});


