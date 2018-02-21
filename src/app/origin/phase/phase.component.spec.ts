import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatTableModule } from '@angular/material';
import { of } from 'rxjs/observable/of';

import { EventService } from '../../event.service';
import { PhaseComponent } from './phase.component';
import { QuakemlService } from '../../quakeml.service';
import { xmlToJson } from '../../xml-to-json';
import { Quakeml } from '../../quakeml';

describe('PhaseComponent', () => {

  const QUAKEML_XML = `
  <q:quakeml xmlns="http://quakeml.org/xmlns/bed/1.2"
      xmlns:catalog="http://anss.org/xmlns/catalog/0.1"
      xmlns:anss="http://anss.org/xmlns/event/0.1"
      xmlns:q="http://quakeml.org/xmlns/quakeml/1.2">
  <eventParameters publicID="quakeml:uu.anss.org/Event/UU/60268292#151873355837">
    <event publicID="quakeml:uu.anss.org/Event/UU/60268292"
        catalog:datasource="uu" catalog:dataid="uu60268292" catalog:eventsource="uu" catalog:eventid="60268292">
      <magnitude publicID="quakeml:uu.anss.org/Netmag/UU/295364">
        <mag>
          <value>2.58</value>
          <uncertainty>0.144</uncertainty>
        </mag>
        <type>Ml</type>
        <originID>quakeml:uu.anss.org/Origin/UU/222529</originID>
        <methodID>smi:uu.anss.org/magnitude/RichterMl2</methodID>
        <stationCount>4</stationCount>
        <azimuthalGap>176.3</azimuthalGap>
        <evaluationMode>manual</evaluationMode>
        <evaluationStatus>reviewed</evaluationStatus>
        <creationInfo>
          <agencyID>UU</agencyID>
          <creationTime>2018-02-15T22:25:37.000Z</creationTime>
        </creationInfo>
      </magnitude>
      <origin publicID="quakeml:uu.anss.org/Origin/UU/222529"
          catalog:datasource="uu" catalog:dataid="uu60268292" catalog:eventsource="uu" catalog:eventid="60268292">
        <originUncertainty>
          <horizontalUncertainty>290</horizontalUncertainty>
          <confidenceEllipsoid>
            <semiMajorAxisLength>1752</semiMajorAxisLength>
            <semiMinorAxisLength>528</semiMinorAxisLength>
            <semiIntermediateAxisLength>720</semiIntermediateAxisLength>
            <majorAxisPlunge>79</majorAxisPlunge>
            <majorAxisAzimuth>354</majorAxisAzimuth>
            <majorAxisRotation>17</majorAxisRotation>
          </confidenceEllipsoid>
          <preferredDescription>confidence ellipsoid</preferredDescription>
          <confidenceLevel>95</confidenceLevel>
        </originUncertainty>
        <time>
          <value>2018-02-15T18:41:06.020Z</value>
        </time>
        <longitude>
          <value>-111.007</value>
        </longitude>
        <latitude>
          <value>44.7378333</value>
        </latitude>
        <depth>
          <value>8440</value>
          <uncertainty>720</uncertainty>
        </depth>
        <depthType>from location</depthType>
        <timeFixed>false</timeFixed>
        <epicenterFixed>false</epicenterFixed>
        <methodID>smi:uu.anss.org/origin/HYP2000</methodID>
        <quality>
          <associatedPhaseCount>27</associatedPhaseCount>
          <usedPhaseCount>27</usedPhaseCount>
          <associatedStationCount>21</associatedStationCount>
          <usedStationCount>21</usedStationCount>
          <standardError>0.13</standardError>
          <azimuthalGap>54</azimuthalGap>
          <secondaryAzimuthalGap>376</secondaryAzimuthalGap>
          <maximumDistance>0.5617</maximumDistance>
          <minimumDistance>0.02150</minimumDistance>
          <medianDistance>0.2914</medianDistance>
        </quality>
        <type>hypocenter</type>
        <evaluationMode>manual</evaluationMode>
        <evaluationStatus>final</evaluationStatus>
        <creationInfo>
          <agencyID>UU</agencyID>
          <creationTime>2018-02-15T22:25:37.000Z</creationTime>
        </creationInfo>
        <arrival publicID="quakeml:uu.anss.org/AssocArO/UU/1907274">
          <pickID>quakeml:uu.anss.org/Arrival/UU/1907274</pickID>
          <phase>P</phase>
          <azimuth>1.6</azimuth>
          <distance>2.150e-02</distance>
          <timeResidual>-.17</timeResidual>
          <timeCorrection>0</timeCorrection>
          <timeWeight>0.14</timeWeight>
          <takeoffAngle>
            <value>163</value>
          </takeoffAngle>
          <creationInfo>
            <agencyID>UU</agencyID>
            <creationTime>2018-02-15T22:25:37.00</creationTime>
          </creationInfo>
        </arrival>
      </origin>
      <pick publicID="quakeml:uu.anss.org/Arrival/UU/1907274">
        <time>
        <value>2018-02-15T18:41:08.57</value>
        <uncertainty>0.06</uncertainty>
        </time>
        <waveformID networkCode="WY" stationCode="YMC" channelCode="EHZ" locationCode="01" />
        <onset>impulsive</onset>
        <polarity>positive</polarity>
        <evaluationMode>manual</evaluationMode>
        <evaluationStatus>reviewed</evaluationStatus>
        <creationInfo>
        <agencyID>UU</agencyID>
        <creationTime>2018-02-15T22:25:37.00</creationTime>
        </creationInfo>
      </pick>
      <pick publicID="quakeml:uu.anss.org/Arrival/UU/1907279">
        <time>
        <value>2018-02-15T18:41:09.83</value>
        <uncertainty>0.06</uncertainty>
        </time>
        <waveformID networkCode="WY" stationCode="YGC" channelCode="EHZ" locationCode="01" />
        <onset>impulsive</onset>
        <polarity>positive</polarity>
        <evaluationMode>manual</evaluationMode>
        <evaluationStatus>reviewed</evaluationStatus>
        <creationInfo>
        <agencyID>UU</agencyID>
        <creationTime>2018-02-15T22:25:37.00</creationTime>
        </creationInfo>
      </pick>
      <preferredOriginID>quakeml:uu.anss.org/Origin/UU/222529</preferredOriginID>
      <preferredMagnitudeID>quakeml:uu.anss.org/Netmag/UU/295364</preferredMagnitudeID>
      <type>earthquake</type>
      <creationInfo>
        <agencyID>UU</agencyID>
        <creationTime>2018-02-15T22:25:38.000Z</creationTime>
        <version>4</version>
      </creationInfo>
    </event>
    <creationInfo>
      <agencyID>UU</agencyID>
      <creationTime>2018-02-15T22:25:58.370Z</creationTime>
    </creationInfo>
  </eventParameters>
  </q:quakeml>
  `;



  let component: PhaseComponent;
  let fixture: ComponentFixture<PhaseComponent>;

  beforeEach(async(() => {
    const eventServiceStub = {
      product$: of({})
    };
    const quakemlServiceStub = {
      getQuakeml: jasmine.createSpy('quakemlService::get'),
      quakeml$: of(null)
    };

    TestBed.configureTestingModule({
      declarations: [
        PhaseComponent
      ],
      imports: [
        MatDialogModule,
        MatTableModule
      ],
      providers: [
        {provide: EventService, useValue: eventServiceStub},
        {provide: QuakemlService, useValue: quakemlServiceStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('formatChannel', () => {
    it('handles full nscl', () => {
      expect(component.formatChannel({
        networkCode: 'net',
        stationCode: 'sta',
        channelCode: 'cha',
        locationCode: 'loc'
      })).toEqual('net sta cha loc');
    });

    it('handles partial nscl', () => {
      expect(component.formatChannel({
        networkCode: 'net',
        stationCode: 'sta'
      })).toEqual('net sta');
    });
  });

  describe('onDownload', () => {
    it('formats download and opens dialog', () => {
      component.sortedPhases = [
        {
          azimuth: 'test azimuth',
          channel: 'test channel',
          distance: 'test distance',
          phase: 'test phase',
          status: 'test status',
          time: 'test time',
          timeResidual: 'test time residual',
          timeWeight: 'test time weight'
        }
      ];

      const spy = spyOn(component.dialog, 'open').and.returnValue({});
      component.onDownload();

      // dialog opened
      expect(component.dialog.open).toHaveBeenCalled();
      // download formatted
      expect(spy.calls.mostRecent().args[1].data.content).toEqual(
        'Channel\tDistance\tAzimuth\tPhase\tArrival Time\tStatus\tResidual\tWeight\n' +
        'test channel\ttest distance\ttest azimuth\ttest phase\ttest time\ttest status\ttest time residual\ttest time weight'
      );
    });
  });

  describe('onQuakeml', () => {
    it('parses quakeml', () => {
      const quakeml = new Quakeml(xmlToJson(QUAKEML_XML));

      component.onQuakeml(quakeml);

      expect(component.sortedPhases).toEqual([
        {
          arrivalPublicID: 'quakeml:uu.anss.org/AssocArO/UU/1907274',
          azimuth: '1.6',
          channel: 'WY YMC EHZ 01',
          distance: '2.150e-02',
          phase: 'P',
          pickPublicId: 'quakeml:uu.anss.org/Arrival/UU/1907274',
          status: 'manual',
          time: '2018-02-15T18:41:08.570Z',
          timeRelative: 2.55,
          timeResidual: '-.17',
          timeWeight: '0.14'
        }
      ]);
    });
  });

  describe('sortPhases', () => {

  });

});
