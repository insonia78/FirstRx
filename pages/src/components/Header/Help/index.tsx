import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import styles from '../../../../../styles/Help.module.scss';
import { useRouter } from 'next/router';

export default function Help() {


    const [windowWidth, setWindowWidth] = useState(0);
    const getSizes = () => {
        setWindowWidth(window.innerWidth);
    }

    useEffect(() => {
        setWindowWidth(window.innerWidth);
        window.addEventListener(
            "resize", getSizes, false);

    });
    const router = useRouter();
    const {
        query: { language  },
    } = router

    return (
        <>
            <main>
                {windowWidth > 420 ?
                <>
                    <div className={styles.main_desktop_container}>
                        <Link href={{
                            pathname:'/',
                            query:{language:language}}}><div className={styles.header_desktop_help} ><u>{'<<<'}
                          {(language === 'english' || language === undefined)   &&  'Home'}
                          {language === 'spanish' && '<Spanish>Home'}
                        </u>
                        </div></Link>
                        <div className={styles.main_desktop_help_title}><b>
                          {(language === 'english' || language === undefined)   &&  'FirstRX Help'}
                          {language === 'spanish' && '<Spanish>FirstRX Help'}
                            
                            </b>
                        </div>
                        <div className={styles.main_desktop_home_coupon_container}>
                            <div className={styles.main_desktop_help_question}>
                            {(language === 'english' || language === undefined)   &&  <>
                            Questions? Give us a call at <b>800.555.1212</b>
                            </>}
                          {language === 'spanish' && 
                          
                          <>
                          {'<Spanish>'}
                            Questions? Give us a call at <b>800.555.1212</b>
                            </>
                          }   
                            
                                
                            </div>
                            <br />
                            <br />
                            <div className={styles.main_desktop_help_content_title}>
                            {language === 'english' || language === undefined   &&  <>
                            Help Topic 1
                            </>}
                          {language === 'spanish' && 
                          
                          <>
                          {'<Spanish>'}
                            Help Topic 1
                            </>
                          }   
                                
                            </div>
                            <br />
                            <p className={styles.main_desktop_help_content_paragraph}>
                            {(language === 'english' || language === undefined)   &&  <>
                            Content needs to be here
                            </>}
                          {language === 'spanish' && 
                          
                          <>
                          {'<Spanish>'}
                            Content needs to be here
                            </>
                          }   
                                
                            </p>
                            <br />
                            <br />
                            <div className={styles.main_desktop_help_content_title}>
                            {(language === 'english' || language === undefined)   &&  <>
                            Help Topic 2
                            </>}
                          {language === 'spanish' && 
                          
                          <>
                          {'<Spanish>'}
                            Help Topic 2
                            </>
                          }   
                                
                            </div>
                            <br />
                            <p className={styles.main_desktop_help_content_paragraph}>
                            {(language === 'english' || language === undefined)   &&  <>
                            Content needs to be here
                            </>}
                          {language === 'spanish' && 
                          
                          <>
                          {'<Spanish>'}
                            Content needs to be here
                            </>
                          }   
                                
                            </p>
                            <br />
                            <br />
                            <div className={styles.main_desktop_help_content_title}>
                            {(language === 'english' || language === undefined)   &&  <>
                            Help Topic 3
                            </>}
                          {language === 'spanish' && 
                          
                          <>
                          {'<Spanish>'}
                            Help Topic 3
                            </>
                          }   
                            
                            </div>
                            <br />
                            <p className={styles.main_desktop_help_content_paragraph}>
                            {(language === 'english' || language === undefined)   &&  <>
                            Content needs to be here                            
                            </>}
                          {language === 'spanish' && 
                          
                          <>
                          {'<Spanish>'}
                            Content needs to be here
                            </>
                          }   
                                
                            </p>
                        </div>
                    </div>
                    <div className={styles.main_desktop_bottom_container}>
                        <span className={styles.main_desktop_bottom_text}>
                        {(language === 'english' || language === undefined)   &&  <>
                        This is an easy and simple process to get big savings. Find the lowest price at a
                pharmacy near you. Get texted a coupon. Bring to your pharmacist. Save $.                            
                            </>}
                          {language === 'spanish' && 
                          
                          <>
                          {'<Spanish>'}
                            This is an easy and simple process to get big savings. Find the lowest price at a
                pharmacy near you. Get texted a coupon. Bring to your pharmacist. Save $.
                            </>
                          }   
                            
                </span>
                    </div>
                </>:
                <div>
                     <Link href={{
                            pathname:'/',
                            query:{language:language}}}><div className={styles.header_desktop_help} ><u>{'<<<'}
                    {(language === 'english' || language === undefined)   &&  'Home'}
                          {language === 'spanish' && '<Spanish>Home'}
                    </u>
                    </div></Link>
                    <div className={styles.main_desktop_help_title}><b>
                    {(language === 'english' || language === undefined )  &&  <>
                    FirstRX Help
                            </>}
                          {language === 'spanish' && 
                          
                          <>
                          {'<Spanish>'}
                            FirstRX Help
                            </>
                          }   
                        
                        </b>
                        </div>
                    <div className={styles.main_desktop_help_question}>
                    {(language === 'english' || language === undefined)   &&  <>
                            Questions? Give us a call at <b>800.555.1212</b>
                            </>}
                          {language === 'spanish' && 
                          
                          <>
                            {'<Spanish>'} 
                            Questions? Give us a call at <b>800.555.1212</b>
                            </>
                          }   </div>
                    <p className={styles.main_desktop_help_content_paragraph}>
                    {(language === 'english' || language === undefined)   &&  <>
                    Content needs to be here
                            </>}
                          {language === 'spanish' && 
                          
                          <>
                          {'<Spanish>'}
                            Content needs to be here
                            </>
                          }
                        
                        </p> 
                </div>
                }
            </main>
        </>
    );
}