import type {Static} from '@sinclair/typebox';
import {Type} from '../utils/typebox.js';

const versionRegExp = /^v\d+\.\d+\.\d+(?:-.+)?$/;

const version = Type.RegEx(versionRegExp, {example: '2.0.0'});
// eslint-disable-next-line @typescript-eslint/naming-convention
const RawStats = Type.Object({
	urls: Type.Integer({minimum: 0, example: 4321}),
	visits: Type.Integer({minimum: 0, example: 4321}),
});

type RawStats = Static<typeof RawStats>;

const formattedNumberRegExp = /^\d{1,3}(?:,\d{1,3})*$/;

// eslint-disable-next-line @typescript-eslint/naming-convention
const FormattedStats = Type.Object({
	urls: Type.RegEx(formattedNumberRegExp, {example: '4,321'}),
	visits: Type.RegEx(formattedNumberRegExp, {example: '4,321'}),
});

type FormattedStats = Static<typeof FormattedStats>;

// eslint-disable-next-line @typescript-eslint/naming-convention
const BaseStats = Type.Object({
	version,
});
type BaseStats = Static<typeof BaseStats>;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Stats = Type.Intersect([BaseStats, Type.Union([RawStats, FormattedStats])], {
	$id: 'Stats',
	title: 'Stats',
	description: 'Usage statistics for this instance',
});
export type Stats = Static<typeof Stats>;
