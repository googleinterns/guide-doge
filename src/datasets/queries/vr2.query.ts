// VRScatterplot2 has segments of browser, country, and source
// VRScatterplot2 generates positively correlated linear pattern of points
import { ScatterPoint } from '../metas/types';
import { DataCube } from '../../models/data-cube/data-cube.model';
import { ResultRow, Category } from '../../models/data-cube/types';
import { unique } from '../../utils/misc';
export interface VRQueryOptions {
  range: [Date, Date];
}
const browsers = ['Firefox', 'Chrome', 'Safari', 'Edge', 'Opera', 'Internet Explorer', 'Samsung Internet'];
const countries = ['China', 'India', 'United States', 'Indonesia', 'Pakistan', 'Brazil', 'Nigeria', 'Bangladesh', 'Russia', 'Mexico', 'Japan', 'Ethiopia', 'Philippines', 'Egypt', 'Vietnam', 'DR Congo', 'Turkey', 'Iran', 'Germany', 'Thailand', 'United Kingdom', 'France', 'Italy', 'Tanzania', 'South Africa', 'Myanmar', 'Kenya', 'South Korea', 'Colombia', 'Spain', 'Uganda', 'Argentina', 'Algeria', 'Sudan', 'Ukraine', 'Iraq', 'Afghanistan', 'Poland', 'Canada', 'Morocco', 'Saudi Arabia', 'Uzbekistan', 'Peru', 'Angola', 'Malaysia', 'Mozambique', 'Ghana', 'Yemen', 'Nepal', 'Venezuela', 'Madagascar', 'Cameroon',  'North Korea', 'Australia', 'Niger', 'Taiwan', 'Sri Lanka', 'Burkina Faso', 'Mali', 'Romania', 'Malawi', 'Chile', 'Kazakhstan', 'Zambia', 'Guatemala', 'Ecuador', 'Syria', 'Netherlands', 'Senegal', 'Cambodia', 'Chad', 'Somalia', 'Zimbabwe', 'Guinea', 'Rwanda', 'Benin', 'Burundi', 'Tunisia', 'Bolivia', 'Belgium', 'Haiti', 'Cuba', 'South Sudan', 'Dominican Republic', 'Czech Republic (Czechia)', 'Greece', 'Jordan', 'Portugal', 'Azerbaijan', 'Sweden', 'Honduras', 'United Arab Emirates', 'Hungary', 'Tajikistan', 'Belarus', 'Austria', 'Papua New Guinea', 'Serbia', 'Israel', 'Switzerland', 'Togo', 'Sierra Leone', 'Hong Kong', 'Laos', 'Paraguay', 'Bulgaria', 'Libya', 'Lebanon', 'Nicaragua', 'Kyrgyzstan', 'El Salvador', 'Turkmenistan', 'Singapore', 'Denmark', 'Finland', 'Congo', 'Slovakia', 'Norway', 'Oman', 'State of Palestine', 'Costa Rica', 'Liberia', 'Ireland', 'Central African Republic', 'New Zealand', 'Mauritania', 'Panama', 'Kuwait', 'Croatia', 'Moldova', 'Georgia', 'Eritrea', 'Uruguay', 'Bosnia and Herzegovina', 'Mongolia', 'Armenia', 'Jamaica', 'Qatar', 'Albania', 'Puerto Rico', 'Lithuania', 'Namibia', 'Gambia', 'Botswana', 'Gabon', 'Lesotho', 'North Macedonia', 'Slovenia', 'Guinea-Bissau', 'Latvia', 'Bahrain', 'Equatorial Guinea', 'Trinidad and Tobago', 'Estonia', 'Timor-Leste', 'Mauritius', 'Cyprus', 'Eswatini', 'Djibouti', 'Fiji', 'Réunion', 'Comoros', 'Guyana', 'Bhutan', 'Solomon Islands', 'Macao', 'Montenegro', 'Luxembourg', 'Western Sahara', 'Suriname', 'Cabo Verde', 'Maldives', 'Malta', 'Brunei', 'Guadeloupe', 'Belize', 'Bahamas', 'Martinique', 'Iceland'];
const sources = ['App campaign',  'Direct',  'Referral'];

export type VRScatterPoint = ScatterPoint<Record<string, string>>;

export interface VRData<S> {
  labels: string[];
  style?: Partial<S>;
  points: VRScatterPoint[];
}

export type VRQuery<S> = (options: VRQueryOptions) => VRData<S>[];

export type LegendItem = {
  labels: string[];
  measureNames: string[];
  periodOffset?: number;
  windowSize?: number;
};

export function createVRQuery<S>(dataCube: DataCube, legendItems: LegendItem[]): VRQuery<S> {
  return (queryOptions) => {
    const measureNames = unique(legendItems.map(item => item.measureNames));
    const rows = dataCube.getDataFor({
      categoryNames: ['browser', 'country', 'source'],
      measureNames: ['activeUsers', 'revenue', 'eventCount'],
    });

    return legendItems.map(item => createVRData(rows, item));
  };
}

export function createVRData<S>(rows: ResultRow[], item: LegendItem): VRData<S> {
  const {
    labels,
    measureNames,
  } = item;
  browsers.reverse();
  countries.reverse();
  sources.reverse();

  const points: VRScatterPoint[] = [];
  let k = 0;
  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < getRand(5, 10); j++) {
      points.push({
        categories: {browser: browsers[k % browsers.length],
          country: countries[k % countries.length],
          source: sources[k % sources.length]},
        x: Math.round(i + getRand(-5, 5)),
        y: Math.round(i + getRand(-5, 5)),
        z: Math.round(i + getRand(-5, 5))});
      k++;
    }
  }

  return {
    labels,
    points,
  };
}

function getRand(min: number , max: number) {
    return Math.random() * (max - min) + min;
 }

