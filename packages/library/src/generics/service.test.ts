/* eslint-disable max-lines */
import DataLoader from 'dataloader';
import { ObjectId, WithId } from 'mongodb';
import { beforeEach, describe, expect, test } from 'vitest';
import { mock, mockReset } from 'vitest-mock-extended';
import { z } from 'zod';

import GenericRepository from './repository.js';
import GenericService from './service.js';
import { MongoDatabaseServiceFindOptions } from './types.js';

/**
 * We expect to break the rules and test over unspecific class implementations.
 * This way we can test all power of abstract classes.
 * This can prevent duplication of tests for real concrect implementations.
 * We can test only the customizations.
 * We can validate using code coverage, because there is no intent for test something that is generic if they keep as is on a concrete class.
 */
interface DummyTest {
  documentId: string;
  name: string;
  numeric: number;
}

class DummyService extends GenericService<DummyTest> {
  constructor(dummyRepository: GenericRepository<DummyTest>) {
    super(dummyRepository);
  }

  override getDocumentSchema(): z.ZodType<DummyTest, z.ZodTypeDef, DummyTest> {
    return z.object({
      documentId: z.string(),
      name: z.string(),
      numeric: z.number(),
    }) satisfies z.ZodType<DummyTest>;
  }
}

const repositoryMock = mock<GenericRepository<DummyTest>>();

const dummyMock: DummyTest = {
  documentId: '1234',
  name: 'Dummy name',
  numeric: 50,
};

beforeEach(() => {
  mockReset(repositoryMock);
});

const FIND_ALL_LENGTH = 10;
const MANY_LENGTH = 2;

describe('Concrete Implementation of Abstract Service - Find', () => {
  test('Service - Find One', async () => {
    // setup
    const expected: WithId<DummyTest> = {
      _id: new ObjectId(123123123123),
      ...dummyMock,
    };

    repositoryMock.findOne.mockResolvedValue(expected);

    // run
    const service = new DummyService(repositoryMock);
    const findOne = await service.findOne('123123123123');

    // assert
    expect(findOne).toEqual(expected);

    expect(repositoryMock.findOne).toHaveBeenCalled();
  });
});

describe('Concrete Implementation of Abstract Service - Find All', () => {
  test('Service - Find All', async () => {
    const expected: WithId<DummyTest> = {
      _id: new ObjectId(123123123123),
      ...dummyMock,
    };
    repositoryMock.findAll.mockResolvedValue(
      Array.from({ length: FIND_ALL_LENGTH }).fill(
        expected,
      ) as WithId<DummyTest>[],
    );

    // run
    const service = new DummyService(repositoryMock);
    const findAll = await service.findAll();

    // assert
    expect(findAll.length).toEqual(FIND_ALL_LENGTH);
    expect(repositoryMock.findAll).toHaveBeenCalled();
  });

  test('Service - Find All by Ids', async () => {
    const id = new ObjectId(123123123123);

    const expected: WithId<DummyTest> = {
      _id: new ObjectId(123123123123),
      ...dummyMock,
    };

    repositoryMock.findAllByIds.mockResolvedValue(
      Array.from({ length: MANY_LENGTH }).fill(expected) as WithId<DummyTest>[],
    );

    // run
    const service = new DummyService(repositoryMock);
    const findAll = await service.findAllByIds(
      Array.from({ length: MANY_LENGTH }).fill(id) as readonly ObjectId[],
    );

    // assert
    expect(findAll.length).toEqual(MANY_LENGTH);
    expect(repositoryMock.findAllByIds).toHaveBeenCalledWith(
      Array.from({ length: MANY_LENGTH }).fill(id),
    );
  });

  test('Service - Find All by Reference', async () => {
    const id = new ObjectId(123123123123);

    const expected: WithId<DummyTest> = {
      _id: new ObjectId(123123123123),
      ...dummyMock,
    };

    repositoryMock.findAllFilter.mockResolvedValue(
      Array.from({ length: MANY_LENGTH }).fill(expected) as WithId<DummyTest>[],
    );

    // run
    const service = new DummyService(repositoryMock);
    const findAllByReference = await service.findAllByReference(
      'documentId',
      id,
    );

    // assert
    expect(findAllByReference.length).toEqual(MANY_LENGTH);
    expect(repositoryMock.findAllFilter).toHaveBeenCalledWith({
      ['documentId']: { $eq: id },
    });
  });

  test('Service - Find all connection', async () => {
    // setup

    const expected: WithId<DummyTest> = {
      _id: new ObjectId(123123123123),
      ...dummyMock,
    };

    repositoryMock.findAllConnection.mockResolvedValue(
      Array.from({ length: FIND_ALL_LENGTH }).fill(
        expected,
      ) as WithId<DummyTest>[],
    );

    repositoryMock.findAllConnectionCount.mockResolvedValue(FIND_ALL_LENGTH);

    // run
    const service = new DummyService(repositoryMock);

    const options: MongoDatabaseServiceFindOptions<DummyTest> = {
      filters: {
        numeric: {
          between: { from: 25, to: 100 },
        },
      },
      page: 1,
      perPage: 10,
      sortBy: 'documentId',
      sortDirection: 'asc',
    };

    const allConnections = await service.findAllConnection(options);

    const { nodes, pageInfo } = allConnections;

    // assert
    expect(nodes[0]?._id.toString()).toEqual(expected._id.toString());

    expect(pageInfo.page).toBe(1);
    expect(pageInfo.hasNextPage).toBe(false);
    expect(pageInfo.nextPage).toBeNull();
    expect(pageInfo.hasPrevPage).toBe(false);
    expect(pageInfo.prevPage).toBeNull();
    expect(pageInfo.totalNodes).toBe(10);
    expect(pageInfo.totalPages).toBe(1);
    expect(pageInfo.start).toBe(1);
    expect(pageInfo.end).toBe(10);

    expect(repositoryMock.findAllConnection).toHaveBeenCalledWith({
      filters: {
        numeric: {
          $gt: 25,
          $lt: 100,
        },
      },
      limit: 10,
      skip: 0,
      sortBy: 'documentId',
      sortDirection: 1,
    });

    expect(repositoryMock.findAllConnectionCount).toHaveBeenCalledWith({
      numeric: {
        $gt: 25,
        $lt: 100,
      },
    });
  });
});

describe('Concrete Implementation of Abstract Service - Insert', () => {
  test('Service - Insert one - OK', async () => {
    // setup
    const expected: WithId<DummyTest> = {
      _id: new ObjectId(123123123123),
      ...dummyMock,
    };

    // run
    const service = new DummyService(repositoryMock);
    repositoryMock.insertOne.mockResolvedValue(expected);

    const node = await service.insertOne(expected);

    // assert
    expect(node.errors).toEqual([]);
    expect(node.node).toEqual(expected);

    expect(repositoryMock.insertOne).toHaveBeenCalled();
  });

  test('Service - Insert one - Fail validation', async () => {
    // setup
    // @ts-expect-error Incomplete Profile
    const expected: DummyTest = {};

    // run
    const service = new DummyService(repositoryMock);
    const node = await service.insertOne(expected);

    // assert
    expect(repositoryMock.insertOne).not.toHaveBeenCalled();
    expect(node.node).toBeNull();
    expect(node.errors.length).toBe(3);
  });

  test('Service - Insert one - Fail exception in repository', async () => {
    // setup
    const expected: WithId<DummyTest> = {
      _id: new ObjectId(123123123123),
      ...dummyMock,
    };

    repositoryMock.insertOne.mockRejectedValue(new Error('Repository error'));

    // run
    const service = new DummyService(repositoryMock);

    await expect(() => service.insertOne(expected)).rejects.toThrow(
      /Repository error/,
    );
  });

  test('Service - Insert Many - OK', async () => {
    // setup
    const id = new ObjectId(123123123123);
    const expected = dummyMock;

    // run
    const service = new DummyService(repositoryMock);
    repositoryMock.insertMany.mockResolvedValue(
      Array.from({ length: MANY_LENGTH }).fill(id) as ObjectId[],
    );

    const insertMany = await service.insertMany(
      Array.from({ length: MANY_LENGTH }).fill(expected) as WithId<DummyTest>[],
    );

    // assert
    expect(insertMany.length).toEqual(MANY_LENGTH);

    expect(repositoryMock.insertMany).toHaveBeenCalledWith(
      Array.from({ length: MANY_LENGTH }).fill(expected),
    );
  });
});

describe('Concrete Implementation of Abstract Service - Update', () => {
  test('Service - Update one - OK', async () => {
    // setup
    const profileId = '123412341234';

    const expected: WithId<DummyTest> = {
      _id: new ObjectId(123123123123),

      ...dummyMock,
    };

    repositoryMock.updateOne.mockResolvedValue(expected);

    // run
    const service = new DummyService(repositoryMock);
    const node = await service.updateOne(profileId, expected);

    // assert
    expect(node.errors).toEqual([]);
    expect(node.node?._id.toString()).toEqual(expected._id.toString());

    expect(repositoryMock.updateOne).toHaveBeenCalled();
  });

  test('Service - Update one - Fail exception in repository', async () => {
    // setup
    const profileId = '123412341234';

    const expected: WithId<DummyTest> = {
      _id: new ObjectId(123123123123),

      ...dummyMock,
    };

    repositoryMock.updateOne.mockRejectedValue(new Error('Repository error'));

    // run
    const service = new DummyService(repositoryMock);

    await expect(() => service.updateOne(profileId, expected)).rejects.toThrow(
      /Repository error/,
    );
  });

  test('Service - Update One - Fail validation', async () => {
    // setup
    const profileId = '123412341234';
    // @ts-expect-error Incomplete Profile
    const expected: ProfileWithId = {};

    // run
    const service = new DummyService(repositoryMock);
    const node = await service.updateOne(profileId, expected);

    // assert
    expect(repositoryMock.updateOne).not.toHaveBeenCalled();
    expect(node.node).toBeNull();
    expect(node.errors.length).toBe(3);
  });
});

describe('Concrete Implementation of Abstract Service - Delete', () => {
  test('Service - Delete one', async () => {
    // setup
    const profileId = '123412341234';
    repositoryMock.deleteOne.mockResolvedValue(true);

    // run
    const service = new DummyService(repositoryMock);
    const isDeleted = await service.deleteOne(profileId);

    // assert
    expect(isDeleted).toBeTruthy();
  });
});

describe('Concrete Implementation of Abstract Service - Data Loader', () => {
  test('Start data loader', async () => {
    // setup
    const id = new ObjectId(123412341234);

    const entries: WithId<DummyTest>[] = [
      {
        _id: id,
        documentId: '1234',
        name: 'Dummy name',
        numeric: 25,
      },
      {
        _id: new ObjectId(321321321321),
        documentId: '1234',
        name: 'Dummy name',
        numeric: 25,
      },
    ];

    repositoryMock.findAllByIds.mockResolvedValue(entries);

    // run
    const service = new DummyService(repositoryMock);
    const dataloader = service.getLoader();
    const response = await dataloader.load(id);

    // assert
    expect(dataloader).instanceOf(DataLoader);
    expect(response._id).toEqual(id);
  });

  test('Trying to load an inexistence item cause error', async () => {
    // setup
    const id = new ObjectId(123412341234);

    const entries: WithId<DummyTest>[] = [
      {
        _id: id,
        documentId: '1234',
        name: 'Dummy name',
        numeric: 25,
      },
      {
        _id: new ObjectId(321321321321),
        documentId: '1234',
        name: 'Dummy name',
        numeric: 25,
      },
    ];

    // run
    const service = new DummyService(repositoryMock);
    expect(() =>
      service.documentsToIds(
        [new ObjectId('6348acd2e1a47ca32e79f46f')],
        entries,
      ),
    ).toThrow(/Data loader not able to find document for provided id/);
  });
});
