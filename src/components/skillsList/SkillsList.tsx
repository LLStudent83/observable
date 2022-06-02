import * as React from 'react';
import { useAppSelector } from '../../hooks';

export default function SkillsList(): JSX.Element {
  const skills = useAppSelector((store) => store.searchSliceReducer.skills);

  return (
    <div>
      <ul>
        {skills.map((skill) => <li key={skill.id}>{skill.name}</li>)}
      </ul>
    </div>

  );
}
