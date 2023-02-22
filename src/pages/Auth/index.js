import React, { useState } from 'react';
import styles from './Auth.module.css';

const DISCORD_ID = '1077746000585838644';
const DISCORD_SECRET = 'vK6SXbzkJ_BdsTC7MtNDX9-eCKJWIp-s';

const loginURL = 'http://localhost:8080/api/auth/login/';

export default function Auth() {
  return (
    <main className={styles.main}>
      <section className={styles.wrapper}>
        <a href={loginURL + 'discord'}>Sign In With Discord</a>
        <a href={loginURL + 'github'}>Sign In With GitHub</a>
      </section>
    </main>
  );
}
