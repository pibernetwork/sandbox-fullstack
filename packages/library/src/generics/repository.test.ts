/* eslint-disable max-lines */
import {
  Collection,
  DeleteResult,
  FindCursor,
  InsertManyResult,
  ObjectId,
  UpdateResult,
  WithId,
} from 'mongodb';
import { beforeEach, describe, expect, test } from 'vitest';
import { mock, mockReset } from 'vitest-mock-extended';

import { Connection } from '../utils/types.js';
import GenericRepository from './repository.js';
import { MongoDatabaseRepositoryFindOptions } from './types.js';

/**
 * We expect to break the rules and test over unspecific class implementations.
 * This way we can test all the power of abstract classes.
 * This can prevent duplication of tests for real concrect implementations.
 * We can test only the customizations.
 * We can validate using code coverage, because there is no intent for test something that is generic if they keep as is on a concrete class.
 */
interface DummyTest {
  documentId: string;
  name: string;
}

class DummyRepository extends GenericRepository<DummyTest> {
  override collectionName: string | undefined = 'dummy';
}

const connectionMock = mock<Connection>();

const collectionMock = mock<Collection>();

beforeEach(() => {
  mockReset(connectionMock);
  mockReset(collectionMock);

  connectionMock.getCollection.mockResolvedValue(collectionMock);
});

const FIND_ALL_LENGTH = 10;
const MANY_LENGTH = 2;

test('Get collection without a name throw Exception', async () => {
  const dummyRepository = new DummyRepository(connectionMock);

  await expect(() => dummyRepository.getCollection()).rejects.toThrow(
    /Missing/,
  );
});

describe('Concrete Implementation of Abstract Repository - Find', () => {
  test('Repository - Find one', async () => {
    // setup
    const expected: WithId<DummyTest> = {
      _id: new ObjectId('6348acd2e1a47ca32e79f46f'),
      documentId: '1234',
      name: 'DummyTest',
    };

    collectionMock.findOne.mockResolvedValue(expected);

    // run
    const dummyRepository = new DummyRepository(connectionMock);
    const findOne = await dummyRepository.findOne('6348acd2e1a47ca32e79f46f');

    // assert
    expect(findOne).toEqual(expected);
    expect(collectionMock.findOne).toHaveBeenCalled();
  });

  test('Repository - Find one fail because document not found', async () => {
    const dummyRepository = new DummyRepository(connectionMock);
    await expect(() =>
      dummyRepository.findOne('6348acd2e1a47ca32e79f46f'),
    ).rejects.toThrow(/Document not found/);
  });
});

describe('Concrete Implementation of Abstract Repository - Find All', () => {
  test('Repository - Find all', async () => {
    // setup
    const expected: WithId<DummyTest> = {
      _id: new ObjectId(123123123123),
      documentId: '1234',
      name: 'DummyTest',
    };

    const cursor = mock<FindCursor<DummyTest>>();
    cursor.toArray.mockResolvedValue(
      Array.from({ length: FIND_ALL_LENGTH }).fill(
        expected,
      ) as WithId<DummyTest>[],
    );
    collectionMock.find.mockReturnValue(cursor);

    // run
    const dummyRepository = new DummyRepository(connectionMock);
    const dummies = await dummyRepository.findAll();

    // assert
    expect(dummies.length).toEqual(FIND_ALL_LENGTH);
    expect(collectionMock.find).toHaveBeenCalled();
    expect(cursor.toArray).toHaveBeenCalled();
  });

  test('Repository - Find all Connection', async () => {
    // setup
    const expected: WithId<DummyTest> = {
      _id: new ObjectId(123123123123),
      documentId: '1234',
      name: 'DummyTest',
    };

    const cursor = mock<FindCursor<WithId<DummyTest>>>();
    cursor.skip.mockImplementationOnce(() => cursor);
    cursor.limit.mockReturnThis();
    cursor.sort.mockReturnThis();
    cursor.toArray.mockResolvedValue(
      Array.from({ length: FIND_ALL_LENGTH }).fill(
        expected,
      ) as WithId<DummyTest>[],
    );

    collectionMock.find.mockReturnValue(cursor);

    // run
    const dummyRepository = new DummyRepository(connectionMock);
    const options: MongoDatabaseRepositoryFindOptions<DummyTest> = {
      filters: {
        documentId: { $eq: '2010-01-01' },
      },
      limit: 10,
      skip: 0,
      sortBy: 'documentId',
      sortDirection: -1,
    };
    const dummiesConnection = await dummyRepository.findAllConnection(options);

    // assert
    expect(dummiesConnection[0]?._id.toString()).toEqual(
      expected._id.toString(),
    );
    expect(dummiesConnection.length).toBe(FIND_ALL_LENGTH);

    expect(cursor.toArray).toHaveBeenCalled();
    expect(cursor.skip).toHaveBeenCalledWith(0);
    expect(cursor.limit).toHaveBeenCalledWith(10);
    expect(cursor.sort).toHaveBeenCalledWith({ ['documentId']: -1 });
    expect(collectionMock.find).toHaveBeenCalledWith({
      documentId: { $eq: '2010-01-01' },
    });
  });

  test('Repository - Find all Connection Count', async () => {
    // setup
    collectionMock.countDocuments.mockResolvedValue(FIND_ALL_LENGTH);

    // run
    const dummyRepository = new DummyRepository(connectionMock);
    const dummiesCount = await dummyRepository.findAllConnectionCount({
      documentId: { $eq: '2010-01-01' },
    });

    // assert
    expect(dummiesCount).toEqual(FIND_ALL_LENGTH);
    expect(collectionMock.countDocuments).toHaveBeenCalledWith({
      documentId: { $eq: '2010-01-01' },
    });
  });

  test('Repository - Find all filter', async () => {
    // setup
    const expected: WithId<DummyTest> = {
      _id: new ObjectId(123123123123),
      documentId: '1234',
      name: 'DummyTest',
    };

    const cursor = mock<FindCursor<WithId<DummyTest>>>();

    cursor.toArray.mockResolvedValue(
      Array.from({ length: FIND_ALL_LENGTH }).fill(
        expected,
      ) as WithId<DummyTest>[],
    );

    collectionMock.find.mockReturnValue(cursor);

    // run
    const dummyRepository = new DummyRepository(connectionMock);

    const dummiesConnection = await dummyRepository.findAllFilter({
      documentId: { $eq: '2010-01-01' },
    });

    // assert
    expect(dummiesConnection[0]?._id.toString()).toEqual(
      expected._id.toString(),
    );
    expect(dummiesConnection.length).toBe(FIND_ALL_LENGTH);

    expect(cursor.toArray).toHaveBeenCalled();

    expect(collectionMock.find).toHaveBeenCalledWith({
      documentId: { $eq: '2010-01-01' },
    });
  });

  test('Repository - Find all by IDs', async () => {
    // setup

    const expected: WithId<DummyTest> = {
      _id: new ObjectId('6348acd2e1a47ca32e79f46f'),
      documentId: '1234',
      name: 'DummyTest',
    };

    const cursor = mock<FindCursor<WithId<DummyTest>>>();

    cursor.toArray.mockResolvedValue(
      Array.from({ length: MANY_LENGTH }).fill(expected) as WithId<DummyTest>[],
    );

    collectionMock.find.mockReturnValue(cursor);

    // run
    const dummyRepository = new DummyRepository(connectionMock);

    const dummiesConnection = await dummyRepository.findAllByIds(
      Array.from({ length: MANY_LENGTH }).fill(
        new ObjectId('6348acd2e1a47ca32e79f46f'),
      ) as readonly ObjectId[],
    );

    // assert
    expect(dummiesConnection[0]?._id.toString()).toEqual(
      expected._id.toString(),
    );
    expect(dummiesConnection.length).toBe(MANY_LENGTH);

    expect(cursor.toArray).toHaveBeenCalled();

    expect(collectionMock.find).toHaveBeenCalledWith({
      _id: {
        $in: Array.from({ length: MANY_LENGTH }).fill(
          new ObjectId('6348acd2e1a47ca32e79f46f'),
        ),
      },
    });
  });
});

describe('Concrete Implementation of Abstract Repository - Insert', () => {
  test('Repository - Insert one', async () => {
    // setup
    const input: DummyTest = {
      documentId: '1234',
      name: 'DummyTest',
    };

    const response = {
      acknowledged: true,
      insertedId: new ObjectId('313233313233313233313233'),
    };

    collectionMock.insertOne.mockResolvedValue(response);

    // run
    const dummyRepository = new DummyRepository(connectionMock);
    const insertOne = await dummyRepository.insertOne(input);

    // assert
    expect(collectionMock.insertOne).toHaveBeenCalledWith(input);
    expect(insertOne._id).toEqual(response.insertedId);
    expect(insertOne.name).toEqual(input.name);
  });

  test('Repository - Insert Many', async () => {
    // setup
    const input: DummyTest = {
      documentId: '1234',
      name: 'DummyTest',
    };

    const response: InsertManyResult<DummyTest> = {
      acknowledged: true,
      insertedCount: 2,
      insertedIds: Array.from({ length: MANY_LENGTH }).fill(
        new ObjectId('313233313233313233313233'),
      ) as ObjectId[],
    };

    collectionMock.insertMany.mockResolvedValue(response);

    // run
    const dummyRepository = new DummyRepository(connectionMock);
    const insertMany = await dummyRepository.insertMany(
      Array.from({ length: MANY_LENGTH }).fill(input) as WithId<DummyTest>[],
    );

    // assert
    expect(collectionMock.insertMany).toHaveBeenCalledWith(
      Array.from({ length: MANY_LENGTH }).fill(input),
    );
    expect(insertMany.length).toBe(MANY_LENGTH);
    expect(insertMany).toEqual(response.insertedIds);
  });

  test('Repository - Insert Many fail because of unknown reasons', async () => {
    // setup
    const input: DummyTest = {
      documentId: '1234',
      name: 'DummyTest',
    };

    const response: InsertManyResult<DummyTest> = {
      acknowledged: false,
      insertedCount: 2,
      insertedIds: Array.from({ length: MANY_LENGTH }).fill(
        new ObjectId('313233313233313233313233'),
      ) as ObjectId[],
    };

    collectionMock.insertMany.mockResolvedValue(response);

    // run
    const dummyRepository = new DummyRepository(connectionMock);
    await expect(() =>
      dummyRepository.insertMany(
        Array.from({ length: MANY_LENGTH }).fill(input) as WithId<DummyTest>[],
      ),
    ).rejects.toThrow(/Error in insert many/);
  });
});

describe('Concrete Implementation of Abstract Repository - Update', () => {
  test('Repository - Update one', async () => {
    // setup
    const dummyId = '313233313233313233313233';

    const dummyWithId: WithId<DummyTest> = {
      _id: new ObjectId(dummyId),
      documentId: '1234',
      name: 'DummyTest',
    };

    const dummyMock: DummyTest = {
      documentId: '1234',
      name: 'DummyTest',
    };

    collectionMock.findOne.mockResolvedValue(dummyWithId);
    collectionMock.updateOne.mockResolvedValue(mock<UpdateResult<DummyTest>>());

    // run
    const dummyRepository = new DummyRepository(connectionMock);
    const updateOne = await dummyRepository.updateOne(dummyId, dummyMock);

    // assert
    expect(updateOne._id.toString()).toEqual(new Object(dummyId).toString());
    expect(updateOne.name).toEqual(dummyWithId.name);
  });
});

describe('Concrete Implementation of Abstract Repository - Delete', () => {
  test('Repository - Delete one', async () => {
    // setup
    const dummyId = '313233313233313233313233';

    const dummyWithId: WithId<DummyTest> = {
      _id: new ObjectId(dummyId),
      documentId: '1234',
      name: 'DummyTest',
    };

    collectionMock.findOne.mockResolvedValue(dummyWithId);
    collectionMock.deleteOne.mockResolvedValue(mock<DeleteResult>());

    // run
    const dummyRepository = new DummyRepository(connectionMock);
    const isDeleted = await dummyRepository.deleteOne(dummyId);

    // assert
    expect(isDeleted).toBeTruthy();
    expect(collectionMock.findOne).toHaveBeenCalled();
    expect(collectionMock.deleteOne).toHaveBeenCalled();
  });
});
