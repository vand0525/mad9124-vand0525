require('dotenv/config');
const { ObjectId } = require('mongodb');
const Student = require('../models/Student');
const studentService = require('./student.js');
const { NotFoundError } = require('../middleware/errors.js');
jest.mock('../models/Student');

describe('StudentService', () => {
	describe('#getAll', () => {
		it('should return values from Student.find', async () => {
			// Arrange
			const EXPECTED = [
				{
					_id: new ObjectId(),
					firstName: 'Tim',
					lastName: 'Robillard',
					owner: {
						_id: new ObjectId(),
						name: 'Tim',
					},
					images: [],
				},
			];

			Student.find.mockResolvedValue(EXPECTED);

			// Act
			const res = await studentService.getAll();

			// Assert
			expect(res).toEqual(EXPECTED);
			expect(Student.find.mock.calls.length).toBe(1);
		});
	});

	describe('#getById', () => {
		it('should return values from Student.getById', async () => {
			// Arrange
			const _id = new ObjectId();
			const EXPECTED = {
				_id,
				firstName: 'Tim',
				lastName: 'Robillard',
				owner: {
					_id: new ObjectId(),
					name: 'Tim',
				},
				images: [],
			};

			Student.findById.mockResolvedValue(EXPECTED);

			// Act
			const res = await studentService.getById(_id.toString());

			// Assert
			expect(res).toEqual(EXPECTED);
			expect(Student.findById.mock.calls.length).toBe(1);
			expect(Student.findById).toBeCalledWith(_id.toString());
		});

		it('should throw an error if not found', async () => {
			const id = new ObjectId().toString();
			Student.findById.mockResolvedValue(null);

			// Act
			//Assert
			await expect(studentService.getById(id)).rejects.toThrow(new NotFoundError(`student with id ${id} not found`));
		});
	});
});
