import { TestBed, inject } from '@angular/core/testing';

import { MappingConfigurationService } from './mapping-configuration.service';

describe('MappingConfigurationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MappingConfigurationService]
    });
  });

  it('should be created', inject([MappingConfigurationService], (service: MappingConfigurationService) => {
    expect(service).toBeTruthy();
  }));
});
