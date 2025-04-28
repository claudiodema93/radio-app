import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const PageContainer = styled(motion.div)`
  padding: 20px;
`;

const Title = styled.h1`
  margin-bottom: 30px;
  color: ${props => props.theme.text};
`;

const ContactLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ContactInfo = styled.div`
  background-color: ${props => props.theme.cardBackground || '#f5f5f5'};
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ContactForm = styled.form`
  background-color: ${props => props.theme.cardBackground || '#f5f5f5'};
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  color: ${props => props.theme.text};
`;

const InfoIcon = styled.div`
  margin-right: 15px;
  font-size: 1.2rem;
  color: ${props => props.theme.primary};
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 30px;
`;

const SocialLink = styled.a`
  color: ${props => props.theme.primary};
  font-size: 1.5rem;
  transition: color 0.3s;
  
  &:hover {
    color: ${props => props.theme.secondary || '#666'};
  }
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: ${props => props.theme.text};
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  background-color: white;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  background-color: white;
`;

const SubmitButton = styled(motion.button)`
  background-color: ${props => props.theme.primary};
  color: white;
  border: none;
  border-radius: 5px;
  padding: 12px 20px;
  font-size: 1rem;
  cursor: pointer;
  font-weight: 500;
`;

const SuccessMessage = styled(motion.div)`
  background-color: #4CAF50;
  color: white;
  padding: 15px;
  border-radius: 5px;
  margin-top: 20px;
`;

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Qui andrebbe la logica per inviare il form
    console.log('Form submitted:', formData);
    setSubmitted(true);
    
    // Reset form after submission
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setSubmitted(false);
    }, 3000);
  };
  
  // Animazione per la pagina
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };
  
  return (
    <PageContainer
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <Title>{t('contact.title', 'Contattaci')}</Title>
      
      <ContactLayout>
        <ContactInfo>
          <InfoItem>
            <InfoIcon><FaMapMarkerAlt /></InfoIcon>
            <div>
              <h3>{t('contact.address', 'Indirizzo')}</h3>
              <p>Via Nicola Fabrizi, 64, 10143 Torino, Italia</p>
            </div>
          </InfoItem>
          
          <InfoItem>
            <InfoIcon><FaPhone /></InfoIcon>
            <div>
              <h3>{t('contact.phone', 'Telefono')}</h3>
              <p>+39 0117764722</p>
            </div>
          </InfoItem>
          
          <InfoItem>
            <InfoIcon><FaEnvelope /></InfoIcon>
            <div>
              <h3>{t('contact.email', 'Email')}</h3>
              <p>info@radioantenna1.it</p>
            </div>
          </InfoItem>
          
          <SocialLinks>
            <SocialLink href="https://facebook.com" target="_blank" aria-label="Facebook">
              <FaFacebook />
            </SocialLink>
            <SocialLink href="https://instagram.com" target="_blank" aria-label="Instagram">
              <FaInstagram />
            </SocialLink>
            <SocialLink href="https://twitter.com" target="_blank" aria-label="Twitter">
              <FaTwitter />
            </SocialLink>
          </SocialLinks>
        </ContactInfo>
        
        <ContactForm onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="name">{t('contact.form.name', 'Nome')}</Label>
            <Input 
              type="text" 
              id="name" 
              name="name" 
              value={formData.name}
              onChange={handleChange}
              required 
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="email">{t('contact.form.email', 'Email')}</Label>
            <Input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email}
              onChange={handleChange}
              required 
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="subject">{t('contact.form.subject', 'Oggetto')}</Label>
            <Input 
              type="text" 
              id="subject" 
              name="subject" 
              value={formData.subject}
              onChange={handleChange}
              required 
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="message">{t('contact.form.message', 'Messaggio')}</Label>
            <Textarea 
              id="message" 
              name="message" 
              value={formData.message}
              onChange={handleChange}
              required 
            />
          </FormGroup>
          
          <SubmitButton 
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t('contact.form.submit', 'Invia')}
          </SubmitButton>
          
          {submitted && (
            <SuccessMessage
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              {t('contact.form.success', 'Messaggio inviato con successo!')}
            </SuccessMessage>
          )}
        </ContactForm>
      </ContactLayout>
    </PageContainer>
  );
};

export default Contact;