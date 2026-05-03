export interface ChecklistItem {
  id: string;
  task: string;
}

export interface ElectionStage {
  id: string;
  title: string;
  emoji: string;
  whatHappens: string;
  whoIsInvolved: string;
  timeline: string;
  takeaway: string;
  tips?: string[];
  checklist?: ChecklistItem[];
  color: string;
}

export const ELECTION_STAGES: ElectionStage[] = [
  {
    id: 'registration',
    title: 'Voter Registration',
    emoji: '📝',
    whatHappens: 'Citizens sign up to be eligible to vote. This involves verifying eligibility requirements like age, citizenship, and residency.',
    whoIsInvolved: 'Eligible citizens, local election officials, community organizations.',
    timeline: 'Ongoing, but usually closes 15-30 days before Election Day depending on the jurisdiction.',
    takeaway: 'Registration is the first step to making your voice heard.',
    color: 'bg-blue-500',
    checklist: [
      { id: 'reg-check', task: 'Check your current registration status' },
      { id: 'reg-update', task: 'Update address if you moved' },
      { id: 'reg-dead', task: 'Note the registration deadline for your state' }
    ],
    tips: [
      'Registers as early as possible to avoid last-minute system delays.',
      'Always double-check your registration after moving or changing your name.',
      'Some states offer same-day registration—check if yours is one of them!'
    ]
  },
  {
    id: 'candidates',
    title: 'Candidate Filing',
    emoji: '🗳️',
    whatHappens: 'Individuals officially declare their intent to run for office. They must meet qualifications and often collect signatures or pay fees.',
    whoIsInvolved: 'Candidates, political parties, election boards.',
    timeline: 'Months or even a year before the election.',
    takeaway: 'Filing ensures that candidates are legally qualified to hold office.',
    color: 'bg-teal-500',
    checklist: [
      { id: 'cand-req', task: 'Research office requirements' },
      { id: 'cand-file', task: 'Submit declaration of candidacy' },
      { id: 'cand-sig', task: 'Collect required signatures' }
    ],
    tips: [
      'Start signature collection early; many signatures get disqualified during verification.',
      'Review campaign finance disclosure rules immediately upon filing.',
      'Check age and residency requirements for specific local offices.'
    ]
  },
  {
    id: 'campaigning',
    title: 'Campaigning',
    emoji: '📢',
    whatHappens: 'Candidates share their platforms, debate, and try to win voter support through ads, rallies, and door-knocking.',
    whoIsInvolved: 'Candidates, campaign staff, volunteers, voters, media.',
    timeline: 'Intensifies 3-6 months before Election Day.',
    takeaway: 'Campaigns help voters understand candidate positions and priorities.',
    color: 'bg-orange-500',
    checklist: [
      { id: 'camp-plat', task: 'Review candidate platforms' },
      { id: 'camp-deb', task: 'Watch or read debate summaries' },
      { id: 'camp-vol', task: 'Identify local volunteer opportunities' }
    ],
    tips: [
      'Seek out nonpartisan sources like the League of Women Voters for neutral guides.',
      'Attend a local town hall or "meet the candidate" event if possible.',
      'Look past catchy slogans to find specific policy proposals.'
    ]
  },
  {
    id: 'early-voting',
    title: 'Early & Mail-In Voting',
    emoji: '📬',
    whatHappens: 'Voters cast ballots before Election Day, either in person at designated sites or via mail-in (absentee) ballots.',
    whoIsInvolved: 'Voters, postal workers, election staff.',
    timeline: 'Starts days or weeks before Election Day.',
    takeaway: 'Early voting provides flexibility and reduces lines on Election Day.',
    color: 'bg-indigo-500',
    checklist: [
      { id: 'early-mail', task: 'Request a mail-in ballot if desired' },
      { id: 'early-loc', task: 'Find early voting locations near you' },
      { id: 'early-post', task: 'Check postmark deadlines' }
    ],
    tips: [
      'Mail your ballot at least a week before the deadline to ensure it arrives on time.',
      'Use an official ballot drop-box for faster delivery than standard mail.',
      'If voting early in person, go mid-week to avoid crowds.'
    ]
  },
  {
    id: 'election-day',
    title: 'Election Day',
    emoji: '⭐',
    whatHappens: 'The main day for in-person voting. Polls are open all day, and volunteers (poll workers) assist voters.',
    whoIsInvolved: 'Voters, poll workers, observers.',
    timeline: 'The first Tuesday after the first Monday in November (in the US).',
    takeaway: 'Election Day is the culmination of the collective choice process.',
    color: 'bg-red-500',
    checklist: [
      { id: 'day-loc', task: 'Verify your designated polling place' },
      { id: 'day-id', task: 'Check ID requirements for your area' },
      { id: 'day-plan', task: 'Plan your time to visit the polls' }
    ],
    tips: [
      'Stay in line! If you are in line before the polls close, you MUST be allowed to vote.',
      'Charge your phone and bring a snack if long lines are expected.',
      'You can usually bring a sample ballot or notes into the voting booth.'
    ]
  },
  {
    id: 'counting',
    title: 'Counting & Tabulation',
    emoji: '🧮',
    whatHappens: 'Ballots are processed, scanned, and counted. This includes verifying mail-in ballots and processing provisional ones.',
    whoIsInvolved: 'Election officials, machine technicians, observers.',
    timeline: 'Starts as polls close; can take several days for full accuracy.',
    takeaway: 'Every valid vote is counted to ensure a fair result.',
    color: 'bg-purple-500',
    tips: [
      'Understand that mail-in ballots often take longer to verify and count than in-person ones.',
      'Be patient with "too close to call" races; accuracy is more important than speed.',
      'Observe the process through official nonpartisan livestreaming if available.'
    ]
  },
  {
    id: 'certification',
    title: 'Certification',
    emoji: '📜',
    whatHappens: 'Official results are finalized after audits, resolving any challenges, and ensuring the totals are accurate.',
    whoIsInvolved: 'State and local officials, canvassing boards.',
    timeline: 'Weeks after the election.',
    takeaway: 'Certification is the formal confirmation of the people\'s choice.',
    color: 'bg-green-600',
    checklist: [
      { id: 'cert-aud', task: 'Follow local audit reports' },
      { id: 'cert-res', task: 'Look for final certified results' }
    ],
    tips: [
      'Audit processes are a sign of a healthy system, not a sign of failure.',
      'Follow official government websites for the final, certified totals.',
      'Individual candidate "concession" is a tradition, but not the legal end of the process.'
    ]
  },
  {
    id: 'voting-demo',
    title: 'Demo Voting',
    emoji: '🗳️',
    whatHappens: 'Experience a mock voting session. See how ballots are presented and how your choice is recorded in a simulated environment.',
    whoIsInvolved: 'In this demo: You!',
    timeline: 'Right now!',
    takeaway: 'Voting interfaces are designed to be clear, accessible, and secure.',
    color: 'bg-yellow-500',
    tips: [
      'Practice using different ballot types (touchscreen vs. paper) if your precinct offers choices.',
      'Check that your selections match your intent before casting the ballot.',
      'Ask a poll worker for help if you are confused by any part of the interface.'
    ]
  },
  {
    id: 'impact',
    title: 'Your Impact',
    emoji: '🏆',
    whatHappens: 'Congratulations! You have navigated the entire election lifecycle. Now, the most important part begins: your participation.',
    whoIsInvolved: 'You, your community, your country.',
    timeline: 'Every election cycle.',
    takeaway: 'Participating in elections is the primary way to shape the future of your government.',
    color: 'bg-indigo-600',
    tips: [
      'Voter participation doesn\'t end at the ballot box; hold your elected officials accountable.',
      'Encourage friends and family to register and make a plan to vote.',
      'Consider volunteering as a poll worker for future elections!'
    ]
  }
];
