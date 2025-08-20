// File: src/components/UserManagement.jsx
// Purpose: New component for the admin to manage user registrations.

import React from 'react';

const UserManagement = ({ users, onApprove, onReject }) => {
    const styles = {
        userItem: { borderBottom: '1px solid #eee', padding: '15px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
        actions: { display: 'flex', gap: '10px' },
        approveButton: { backgroundColor: '#52c41a', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer' },
        rejectButton: { backgroundColor: '#f5222d', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer' }
    };

    return (
        <div>
            <h3>Pending User Registrations</h3>
            {users.length === 0 ? (
                <p>No pending registrations.</p>
            ) : (
                <div>
                    {users.map(user => (
                        <div key={user.id} style={styles.userItem}>
                            <div>
                                <p><strong>Name:</strong> {user.fullName}</p>
                                <p><strong>Employee ID:</strong> {user.employeeId}</p>
                                <p><strong>Department:</strong> {user.department}</p>
                            </div>
                            <div style={styles.actions}>
                                <button onClick={() => onApprove(user.id)} style={styles.approveButton}>Approve</button>
                                <button onClick={() => onReject(user.id)} style={styles.rejectButton}>Reject</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserManagement;