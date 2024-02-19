import React from 'react';
import styles from './tags-status.module.scss';

const TagsStatus = ({ tags, amount, customStyles = {} }) => {
    const colorage = (tag) => {
        const colorage = {
            'GORE': 'red',
            'SEXUAL VIOLENCE': 'red',
            'SUGGESTIVE': 'orange',
            'default': 'default'
        }
        return colorage[tag] || colorage['default'];
    }

    return (
        <div className={styles.manga_tags}>
            {tags?.map((el, idx) => {
                    if (idx < amount) {
                        return (
                            <span 
                                className={styles[colorage(el)]} 
                                style={customStyles} 
                                key={idx}> 
                                    {el}
                            </span>
                        )
                    } else if (idx === amount) {
                        return <span className={styles.more} key={idx}>MORE</span> 
                    } else return null
                })
            }
        </div>
    );
};

export default TagsStatus;
