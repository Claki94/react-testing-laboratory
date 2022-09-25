import * as apiModel from './api/project.api-model';
import { mapProjectFromApiToVm } from './project.mapper';
import * as mappers from '../../common/mappers/collection.mapper';

describe('Project mapper specs', () => {
  it.each<apiModel.Project>([null, undefined])(
    'should return an empty view model project when it feeds %p',
    (project: apiModel.Project) => {
      // Arrange
      const emptyProject: apiModel.Project = {
        id: '',
        name: '',
        externalId: '',
        comments: '',
        isActive: false,
        employees: [],
      };

      // Act
      const viewModelProject = mapProjectFromApiToVm(project);

      // Assert
      expect(viewModelProject).toEqual(emptyProject);
    }
  );

  it('should return a view model project when it feeds a correct api model project', () => {
    // Arrange
    const project: apiModel.Project = {
      id: '1',
      name: 'test project',
      externalId: 'a1',
      comments: 'test comments',
      isActive: true,
      employees: [
        { id: '2', employeeName: 'test employee name', isAssigned: true },
      ],
    };

    // Act
    const viewModelProject = mapProjectFromApiToVm(project);

    // Assert
    expect(viewModelProject).toEqual(project);
  });

  it.each<apiModel.EmployeeSummary[]>([null, undefined])(
    'should return a view model project with an empty employees list when it feeds an api model project with %p employees',
    (employeeSummary: any) => {
      // Arrange
      const project: apiModel.Project = {
        id: '1',
        name: 'test project',
        externalId: 'a1',
        comments: 'test comments',
        isActive: true,
        employees: employeeSummary,
      };

      // Act
      const viewModelProject = mapProjectFromApiToVm(project);

      // Assert
      expect(viewModelProject.employees).toEqual([]);
    }
  );

  it('should call mapToCollection', () => {
    // Arrange
    const project: apiModel.Project = {
      id: '1',
      name: 'test project',
      externalId: 'a1',
      comments: 'test comments',
      isActive: true,
      employees: [],
    };

    const stub = jest.spyOn(mappers, 'mapToCollection');

    // Act
    mapProjectFromApiToVm(project);

    // Assert
    expect(stub).toHaveBeenCalled();
    expect(stub).toHaveBeenCalledWith([], expect.any(Function));
  });
});
