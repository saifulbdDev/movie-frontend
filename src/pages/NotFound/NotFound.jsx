import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';




import './notFound.scss';

export default function NotFound() {
    return (
      
            <section className="section_not-found">
                <div className="section_not-found_box">
                    <h3 className="section_not-found_title">Lost your way?</h3>
                    <p className="section_not-found_body">
                    Sorry, we can&apos;t find that page.
                    You&apos;ll find lots to expore on the home page.
                    </p>
                    <Link to="/movies">
                        <Button text="Back" />
                    </Link>
                </div>
            </section>
      
    );
}
