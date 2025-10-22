'use client';

import ProfileCard from './ProfileCard';

const cLevelTeam = [
  {
    name: 'Seunghan Ko',
    title: 'CEO',
    role: '8 years full-stack & AI project leadership',
    handle: 'seunghanko',
    status: 'Online' as const,
    avatarUrl: '/person.png',
  },
  {
    name: 'Jitae Kim',
    title: 'CPO',
    role: 'Marketing & Product Strategy',
    handle: 'jitaekim',
    status: 'Online' as const,
    avatarUrl: '/person.png',
  },
  {
    name: 'Mungyu Choi',
    title: 'CFO',
    role: 'Finance & Operations',
    handle: 'mungyuchoi',
    status: 'Online' as const,
    avatarUrl: '/person.png',
  },
];

const departments = [
  {
    name: 'Planning & Marketing',
    members: ['Heo Won (Planning Lead)', 'Kim Hayoon (Marketing Lead)', 'Kim Minjae (Research Lead)'],
  },
  {
    name: 'Design',
    members: ['Kim Yejun (UI/UX Designer)'],
  },
  {
    name: 'Development',
    members: [
      'Lee Hyunseo (Backend)',
      'Lee Suho (Frontend)',
      'Kim Sehyun (Full-stack)',
      'Jeon Yejun (AI)',
      'Lee Jiseong (ML)',
      'Lee Geonhee (Infrastructure)',
      'Moon Seojun (App)',
    ],
  },
  {
    name: 'QA & CS',
    members: ['Jung Woosung (QA)', 'Ahn Woochan (CS)'],
  },
  {
    name: 'Digital Marketing',
    members: ['Jo Mungeon (Performance)', 'Heo Ganghyun (Content)'],
  },
];

export function TeamSection() {
  return (
    <section className="container mx-auto px-4 py-16 sm:py-20">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          Meet Our Team
        </h2>
        <p className="mt-4 text-lg text-gray-400">
          19 dedicated professionals driving SAENA's vision
        </p>
      </div>

      {/* C-Level Team */}
      <div className="mb-16">
        <h3 className="mb-8 text-center text-2xl font-bold text-lime-400">Leadership</h3>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {cLevelTeam.map((member, index) => (
            <ProfileCard
              key={index}
              name={member.name}
              title={member.role}
              handle={member.handle}
              status={member.status}
              avatarUrl={member.avatarUrl}
              iconUrl="/iconpattern.png"
              grainUrl=""
              showUserInfo={true}
              showBehindGradient={true}
              enableTilt={true}
              enableMobileTilt={false}
              contactText="Connect"
              onContactClick={() => console.log(`Contact ${member.name}`)}
            />
          ))}
        </div>
      </div>

      {/* Departments */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {departments.map((dept, index) => (
          <div
            key={index}
            className="rounded-2xl border border-white/10 bg-gradient-to-br from-neutral-900 to-neutral-950 p-6"
          >
            <h4 className="mb-4 text-lg font-bold text-lime-400">{dept.name}</h4>
            <ul className="space-y-2">
              {dept.members.map((member, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-lime-400" />
                  {member}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
