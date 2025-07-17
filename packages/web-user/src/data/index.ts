import { Actor, Chef, Barista, Painter, Doctor, Police, Nurse, Developer, Veterinarian, Conductor, Hairdresser, Farmer, Player, President, Pilot, Lawyer, Firefighter, Scientist, Soldier, Photographer, Teacher, Singer, Writer, Professor, Interneter, Builder, Progammer, Reporter, Gold, Financialexpert } from '@/assets';
import { BookOpen, Code, Calculator, Stethoscope, Camera, Shield, Music, Scissors, Sprout, Trophy, Crown, Plane, Scale, Flame, Paintbrush, Drama, Coffee, Microscope, Sword, Gamepad2, Newspaper, TrendingUp, Mic, HardHat, Heart, GraduationCap, Monitor } from 'lucide-react';
import { color } from '@packages/design-token';

export const jobCategories = [
  { id: 'police', name: '경찰', img: Police, icon: Shield, bgColor: color.main[500], description: '사회 안전을 지키는 일' },
  { id: 'developer', name: '개발자', img: Developer, icon: Code, bgColor: color.main[600], description: '소프트웨어와 웹을 개발하는 일' },
  { id: 'conductor', name: '지휘자', img: Conductor, icon: Music, bgColor: color.main[400], description: '오케스트라를 이끌고 연주하는 일' },
  { id: 'hairdresser', name: '미용사', img: Hairdresser, icon: Scissors, bgColor: color.main[300], description: '헤어스타일을 디자인하고 관리하는 일' },
  { id: 'farmer', name: '농부', img: Farmer, icon: Sprout, bgColor: color.main[700], description: '농작물을 기르고 수확하는 일' },
  { id: 'athlete', name: '운동선수', img: Player, icon: Trophy, bgColor: color.main[800], description: '스포츠 경기에 참가하고 훈련하는 일' },
  { id: 'president', name: '대통령', img: President, icon: Crown, bgColor: color.main[900], description: '국가를 이끌고 정책을 결정하는 일' },
  { id: 'pilot', name: '비행사', img: Pilot, icon: Plane, bgColor: color.main[200], description: '항공기를 조종하고 운항하는 일' },
  { id: 'lawyer', name: '변호사', img: Lawyer, icon: Scale, bgColor: color.main[100], description: '법률 서비스를 제공하고 변론하는 일' },
  { id: 'firefighter', name: '소방관', img: Firefighter, icon: Flame, bgColor: '#e74c3c', description: '화재를 진압하고 구조 활동을 하는 일' },
  { id: 'painter', name: '화가', img: Painter, icon: Paintbrush, bgColor: '#9b59b6', description: '그림을 그리고 예술 작품을 만드는 일' },
  { id: 'actor', name: '배우', img: Actor, icon: Drama, bgColor: '#f39c12', description: '연기를 통해 캐릭터를 표현하는 일' },
  { id: 'barista', name: '바리스타', img: Barista, icon: Coffee, bgColor: '#8b4513', description: '커피를 제조하고 고객을 응대하는 일' },
  { id: 'scientist', name: '과학자', img: Scientist, icon: Microscope, bgColor: '#2ecc71', description: '연구를 통해 새로운 지식을 발견하는 일' },
  { id: 'soldier', name: '군인', img: Soldier, icon: Sword, bgColor: '#34495e', description: '국가를 방어하고 군사 임무를 수행하는 일' },
  { id: 'photographer', name: '사진작가', img: Photographer, icon: Camera, bgColor: '#1abc9c', description: '순간을 포착하고 기록하는 일' },
  { id: 'doctor', name: '의사', img: Doctor, icon: Stethoscope, bgColor: '#e67e22', description: '환자를 진료하고 치료하는 일' },
  { id: 'teacher', name: '교사', img: Teacher, icon: BookOpen, bgColor: '#3498db', description: '학생들을 가르치고 교육하는 일' },
  { id: 'chef', name: '요리사', img: Chef, icon: Calculator, bgColor: '#95a5a6', description: '음식을 만들고 메뉴를 개발하는 일' },
  { id: 'singer', name: '가수', img: Singer, icon: Mic, bgColor: '#e91e63', description: '노래를 부르고 음악을 만드는 일' },
  { id: 'writer', name: '작가', img: Writer, icon: Paintbrush, bgColor: '#607d8b', description: '소설, 에세이 등을 쓰는 일' },
  { id: 'professor', name: '교수', img: Professor, icon: GraduationCap, bgColor: '#795548', description: '대학에서 연구하고 강의하는 일' },
  { id: 'streamer', name: '인터넷 방송인', img: Interneter, icon: Monitor, bgColor: '#ff5722', description: '온라인으로 방송하고 콘텐츠를 제작하는 일' },
  { id: 'constructor', name: '건설자', img: Builder, icon: HardHat, bgColor: '#ff9800', description: '건물과 시설을 건설하는 일' },
  { id: 'veterinarian', name: '수의사', img: Veterinarian, icon: Heart, bgColor: '#4caf50', description: '동물을 치료하고 건강을 관리하는 일' },
  { id: 'nurse', name: '간호사', img: Nurse, icon: Heart, bgColor: '#f44336', description: '환자를 돌보고 의료진을 보조하는 일' },
  { id: 'progamer', name: '프로게이머', img: Progammer, icon: Gamepad2, bgColor: '#9c27b0', description: '게임 대회에 참가하고 연습하는 일' },
  { id: 'reporter', name: '기자', img: Reporter, icon: Newspaper, bgColor: '#2196f3', description: '뉴스를 취재하고 기사를 쓰는 일' },
  { id: 'analyst', name: '금융분석가', img: Gold, icon: TrendingUp, bgColor: '#00bcd4', description: '금융 시장을 분석하고 투자를 조언하는 일' },
  { id: 'announcer', name: '아나운서', img: Financialexpert, icon: Mic, bgColor: '#673ab7', description: '방송에서 뉴스를 전달하고 진행하는 일' }
];
