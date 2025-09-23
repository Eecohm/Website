import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './RegistartionApprovals.module.css';
import NavBar from '../../NavBar/NavBar';
import { useBaseMediaUrl, useBaseUrl } from '../../../../Context/BaseUrlContext';
import { useAuth } from '../../Login/Auth/AuthContext';
import StudentDetails from './RegistrationApprovalDetails/StudentDetails';
import TeacherDetails from './RegistrationApprovalDetails/TeacherDetails';
import EmployeeDetails from './RegistrationApprovalDetails/EmployeeDetails';
import GuardianDetails from './RegistrationApprovalDetails/GuardianDetails';
import OwnerDetails from './RegistrationApprovalDetails/OwnerDetails';

const RegistrationApproval = () => {
    const pk = localStorage.getItem('userId');
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [userDetails, setUserDetails] = useState(null);
    const [detailsLoading, setDetailsLoading] = useState(false);
    const [detailsError, setDetailsError] = useState(null);
    const baseUrl = useBaseUrl();
    const basemediaUrl = useBaseMediaUrl();
    const { token } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            if (!token) {
                console.warn('Access token missing');
                navigate('/login');
                return;
            }

            try {
                const response = await fetch(`${baseUrl}/user/user/?verified=unverified`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    if (response.status === 401) {
                        throw new Error('Invalid or expired token');
                    }
                    throw new Error(`Failed to fetch users: ${response.status}`);
                }
                const data = await response.json();
                setUsers(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
                if (err.message.includes('Invalid or expired token')) {
                    navigate('/login');
                }
            }
        };

        fetchUsers();
    }, [baseUrl, token, navigate]);

    const handleViewDetails = async (user) => {
        setSelectedUser(user);
        setDetailsLoading(true);
        setDetailsError(null);

        const roleEndpoints = {
            student: 'students',
            teacher: 'teacher',
            employee: 'employee',
            guardian: 'guardian',
            owner: 'owner'
        };

        const endpoint = roleEndpoints[user.role];
        if (!endpoint) {
            setDetailsError('Invalid user role');
            setDetailsLoading(false);
            return;
        }

        try {
            const response = await fetch(`${baseUrl}/user/${endpoint}/${user.id}/`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('Invalid or expired token');
                }
                throw new Error(`Failed to fetch user details: ${response.status}`);
            }
            const data = await response.json();
            setUserDetails(data);
            setDetailsLoading(false);
            // Prevent body scroll while modal open
            document.body.style.overflow = 'hidden';
        } catch (err) {
            setDetailsError(err.message);
            setDetailsLoading(false);
            if (err.message.includes('Invalid or expired token')) {
                navigate('/login');
            }
        }
    };

    const handleVerify = async () => {
        if (!selectedUser) return;

        try {
            const response = await fetch(`${baseUrl}/user/user/`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: selectedUser.email,
                    verified: 'verified'
                })
            });
            if (!response.ok) {
                throw new Error(`Failed to verify user: ${response.status}`);
            }
            setUsers(users.filter(user => user.email !== selectedUser.email));
            handleCloseModal();
        } catch (err) {
            setDetailsError(err.message);
        }
    };

    const handleReject = async () => {
        if (!selectedUser) return;

        try {
            const response = await fetch(`${baseUrl}/user/user/`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: selectedUser.email,
                    verified: 'rejected'
                })
            });
            if (!response.ok) {
                throw new Error(`Failed to reject user: ${response.status}`);
            }
            setUsers(users.filter(user => user.email !== selectedUser.email));
            handleCloseModal();
        } catch (err) {
            setDetailsError(err.message);
        }
    };

    const handleCloseModal = () => {
        setSelectedUser(null);
        setUserDetails(null);
        setDetailsError(null);
        // Restore body scroll
        document.body.style.overflow = 'auto';
    };

    const filteredUsers = users.filter(user =>
        (user.full_name || user.email).toLowerCase().includes(searchTerm.toLowerCase())
    );

    const renderDetails = () => {
        if (detailsLoading) return <p className={styles.loading}>Loading details...</p>;
        if (detailsError) return <p className={styles.error}>{detailsError}</p>;
        if (!userDetails) return null;

        switch (selectedUser.role) {
            case 'student':
                return <StudentDetails details={userDetails} />;
            case 'teacher':
                return <TeacherDetails details={userDetails} />;
            case 'employee':
                return <EmployeeDetails details={userDetails} />;
            case 'guardian':
                return <GuardianDetails details={userDetails} />;
            case 'owner':
                return <OwnerDetails details={userDetails} />;
            default:
                return <p className={styles.error}>Invalid user role</p>;
        }
    };

    return (
        <>
            <NavBar />
            <div className={styles.mainDiv}>
                <div className={styles.container}>
                    <div className={styles.searchWrapper}>
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={styles.searchInput}
                        />
                    </div>
                    {loading && <p className={styles.loading}>Loading...</p>}
                    {error && <p className={styles.error}>{error}</p>}
                    {!loading && !error && filteredUsers.length === 0 && (
                        <p className={styles.noResults}>No users found</p>
                    )}
                    <div className={styles.cardGrid}>
                        {filteredUsers.map((user, index) => (
                            <div key={index} className={styles.card}>
                                <div className={styles.photoWrapper}>
                                    {user.photo ? (
                                        <img
                                            src={`${basemediaUrl}${user.photo}`}
                                            alt="User"
                                            className={styles.userPhoto}
                                        />
                                    ) : (
                                        <div className={styles.photoPlaceholder}>
                                            {user.full_name
                                                ? user.full_name.charAt(0).toUpperCase()
                                                : user.email.charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                </div>
                                <div className={styles.cardContent}>
                                    <h3 className={styles.userName}>
                                        {user.full_name || user.email}
                                    </h3>
                                    <p className={styles.userRole}>
                                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                                    </p>
                                    <button
                                        className={styles.viewButton}
                                        onClick={() => handleViewDetails(user)}
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {selectedUser && (
                <div className={styles.modal} onClick={handleCloseModal} role="dialog" aria-modal="true">
                    <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                        <h2 className={styles.modalTitle}>User Details</h2>
                        {renderDetails()}
                        <div className={styles.modalButtons}>
                            <button
                                className={`${styles.modalButton} ${styles.closeButton}`}
                                onClick={handleCloseModal}
                            >
                                Close
                            </button>
                            <button
                                className={`${styles.modalButton} ${styles.verifyButton}`}
                                onClick={handleVerify}
                            >
                                Verify
                            </button>
                            <button
                                className={`${styles.modalButton} ${styles.rejectButton}`}
                                onClick={handleReject}
                            >
                                Reject
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default RegistrationApproval;
