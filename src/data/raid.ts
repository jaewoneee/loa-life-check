export type RaidDataTypes = {
  name: string;
  difficulty: string;
  ilvl: number;
  phase?: number;
  gold: number;
  isChecked?: boolean;
};

const raidData: RaidDataTypes[] = [
  { name: '에키드나', difficulty: '하드', ilvl: 1630, gold: 18500 },
  { name: '에키드나', difficulty: '노말', ilvl: 1620, gold: 14500 },
  { name: '카멘', difficulty: '하드', ilvl: 1630, phase: 4, gold: 21000 },
  { name: '카멘', difficulty: '하드', ilvl: 1630, phase: 3, gold: 20000 },
  { name: '카멘', difficulty: '노말', ilvl: 1610, gold: 13000 },
  { name: '혼돈의 상아탑', difficulty: '하드', ilvl: 1620, gold: 14500 },
  { name: '혼돈의 상아탑', difficulty: '노말', ilvl: 1600, gold: 9000 },
  { name: '일리아칸', difficulty: '하드', ilvl: 1600, gold: 10000 },
  { name: '일리아칸', difficulty: '노말', ilvl: 1580, gold: 7500 },
  { name: '카양겔', difficulty: '하드', ilvl: 1580, gold: 6500 },
  { name: '카양겔', difficulty: '노말', ilvl: 1540, gold: 4500 },
  { name: '아브렐슈드', difficulty: '하드', phase: 4, ilvl: 1560, gold: 3000 },
  { name: '아브렐슈드', difficulty: '하드', phase: 3, ilvl: 1550, gold: 2000 },
  { name: '아브렐슈드', difficulty: '하드', phase: 2, ilvl: 1540, gold: 4000 },
  { name: '아브렐슈드', difficulty: '노말', phase: 4, ilvl: 1520, gold: 2500 },
  { name: '아브렐슈드', difficulty: '노말', phase: 3, ilvl: 1500, gold: 1500 },
  { name: '아브렐슈드', difficulty: '노말', phase: 2, ilvl: 1490, gold: 3000 },
  { name: '쿠크세이튼', difficulty: '노말', ilvl: 1475, gold: 3000 },
  { name: '비아키스', difficulty: '하드', ilvl: 1460, gold: 2400 },
  { name: '비아키스', difficulty: '노말', ilvl: 1430, gold: 1600 },
  { name: '발탄', difficulty: '하드', ilvl: 1445, gold: 1800 },
  { name: '발탄', difficulty: '노말', ilvl: 1415, gold: 1200 },
];

export { raidData };

// 한 캐릭당 3개씩
// 1605;
// 상노탑;
// 하칸;
// 하브14
