import { Paper, Container, Box, Typography, Theme } from '@mui/material';
import { styled } from '@mui/material/styles';

const AuthWrapper = styled(Box)(({ theme }: { theme: Theme }) => ({
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.grey[50],
    padding: theme.spacing(2)
}));

const FormPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    width: '100%',
    maxWidth: 450,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
}));

interface AuthFormLayoutProps {
    children: React.ReactNode;
    title: string;
    subtitle?: string;
}

const AuthFormLayout = ({ children, title, subtitle }: AuthFormLayoutProps) => {
    return (
        <AuthWrapper>
            <Container maxWidth="sm">
                <FormPaper elevation={3}>
                    <Typography component="h1" variant="h4" gutterBottom>
                        {title}
                    </Typography>
                    {subtitle && (
                        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                            {subtitle}
                        </Typography>
                    )}
                    <Box width="100%" mt={3}>
                        {children}
                    </Box>
                </FormPaper>
            </Container>
        </AuthWrapper>
    );
};

export default AuthFormLayout;
