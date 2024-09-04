"use client";

import styles from "./page.module.css";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { useEffect, useState } from "react";
import { GetInfo } from "./button";

export default function Home() {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const user = await GetInfo();
      setUserInfo(user);
    };

    fetchUserInfo();
  }, []);

  return (
    <main className={styles.main}>
      {userInfo ? (
        <div>
          <h1>User Info</h1>
          <p>{JSON.stringify(userInfo, null, 2)}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
}
