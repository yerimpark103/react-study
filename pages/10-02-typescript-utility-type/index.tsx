export default function TypescriptUtilityPage() {
  interface IProfile {
    name: string;
    age: number;
    breed: string;
    hobby?: string;
  }

  // 1. Pick Type
  /*
    type aaa = {
      name: string;
      age: number;
    }
  */
  type aaa = Pick<IProfile, 'name' | 'age'>;

  // 2. Omit Type
  /*
    type bbb = {
      name: string;
      age: number;
      hobby?: string | undefined;
    }
  */
  type bbb = Omit<IProfile, 'breed'>;

  // 3. Partial Type -> 타입에 ?를 붙임
  /* 
    type ccc = {
      name?: string | undefined;
      age?: number | undefined;
      breed?: string | undefined;
      hobby?: string | undefined;
    }
  */
  type ccc = Partial<IProfile>;

  // 4. Required Type
  /*
    type ddd = {
      name: string;
      age: number;
      breed: string;
      hobby: string;
    }
  */
  type ddd = Required<IProfile>;

  // 5. Record Type
  type eee = 'Evie' | 'EV' | '이비'; // Union type
  let myCat: eee;

  /*
    type fff = {
      Evie: IProfile;
      EV: IProfile;
      이비: IProfile;
    }
  */
  type fff = Record<eee, IProfile>; // Record type

  // type vs interface : 선언 병합 차이
  interface IProfile {
    numChuruAte: number;
  } // IProfile에 numChuruAte 조건이 들어가게 된다.
}
