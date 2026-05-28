const API_BASE_URL = 'http://localhost:8080';

// Get admin phone from localStorage
window.addEventListener('load', function() {
    const adminPhone = localStorage.getItem('adminPhone');
    if (adminPhone) {
        document.getElementById('adminPhone').textContent = `Welcome, Admin (${adminPhone})`;
    } else {
        // If no phone found, redirect to login
        window.location.href = '/login.html';
    }
});

function logout() {
    // Clear admin data
    localStorage.removeItem('adminPhone');
    // Redirect to login
    window.location.href = '/login.html';
}

// Menu Functions
function showMenu(menuName) {
    // Hide all menus and forms
    document.querySelectorAll('.menu-section').forEach(menu => {
        menu.classList.remove('active');
    });
    document.querySelectorAll('.form-section').forEach(form => {
        form.classList.remove('active');
    });
    
    // Show selected menu
    const menu = document.getElementById(menuName + '-menu');
    if (menu) {
        menu.classList.add('active');
    }
}

function backToMenu() {
    // Hide all menus and forms
    document.querySelectorAll('.menu-section').forEach(menu => {
        menu.classList.remove('active');
    });
    document.querySelectorAll('.form-section').forEach(form => {
        form.classList.remove('active');
    });
}

function openForm(formType) {
    // Hide menu
    document.querySelectorAll('.menu-section').forEach(menu => {
        menu.classList.remove('active');
    });
    
    // Show selected form
    const form = document.getElementById(formType + '-form');
    if (form) {
        form.classList.add('active');
    }
}

function closeForm(formType) {
    // Hide form
    const form = document.getElementById(formType + '-form');
    if (form) {
        form.classList.remove('active');
        // Reset form if it exists
        const formElement = document.getElementById(formType + 'Form');
        if (formElement) {
            formElement.reset();
        }
    }
    // Determine which menu to show based on form type
    let menuType = 'driver';
    if (formType.includes('Truck') || formType === 'saveTruck' || formType === 'findTruck' || formType === 'deleteTruck' || formType === 'updateTruckByCarrier') {
        menuType = 'truck';
    } else if (formType.includes('Carrier') || formType === 'saveCarrier' || formType === 'findCarrier' || formType === 'deleteCarrier') {
        menuType = 'carrier';
    } else if (formType.includes('Address') || formType === 'saveAddress' || formType === 'findAddress' || formType === 'deleteAddress') {
        menuType = 'address';
    }
    // Show menu
    showMenu(menuType);
}

// Show Alert
function showAlert(elementId, message, type) {
    const alertEl = document.getElementById(elementId);
    alertEl.textContent = message;
    alertEl.className = `alert show alert-${type}`;
    setTimeout(() => alertEl.classList.remove('show'), 4000);
}

// Show/Hide Loading
function setLoading(elementId, show) {
    const loadingEl = document.getElementById(elementId);
    if (show) {
        loadingEl.classList.add('show');
    } else {
        loadingEl.classList.remove('show');
    }
}

// Save Driver Handler
async function handleSaveDriver(event) {
    event.preventDefault();
    
    const driverData = {
        id: document.getElementById('driverId').value,
        name: document.getElementById('driverName').value,
        contact: document.getElementById('driverContact').value
    };

    setLoading('saveDriver-loading', true);
    
    try {
        const response = await fetch(`${API_BASE_URL}/savedriverdetails`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(driverData)
        });

        const data = await response.json();
        console.log('Save Driver Response:', response.status, data);

        if (response.ok) {
            showAlert('saveDriver-alert', 'Driver saved successfully!', 'success');
            document.getElementById('saveDriverForm').reset();
            setTimeout(() => {
                closeForm('saveDriver');
            }, 1500);
        } else {
            showAlert('saveDriver-alert', data.message || 'Failed to save driver', 'error');
        }
    } catch (error) {
        console.error('Error saving driver:', error);
        showAlert('saveDriver-alert', 'Error: ' + error.message, 'error');
    } finally {
        setLoading('saveDriver-loading', false);
    }
}

// Find Driver Handler
async function handleFindDriver(event) {
    event.preventDefault();
    
    const driverId = document.getElementById('findDriverId').value;
    setLoading('findDriver-loading', true);
    
    try {
        const response = await fetch(`${API_BASE_URL}/finddriver/${driverId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        console.log('Find Driver Response:', response.status, data);

        if (response.ok && data.data) {
            const driver = data.data;
            document.getElementById('detailId').textContent = driver.id || '-';
            document.getElementById('detailName').textContent = driver.name || '-';
            document.getElementById('detailContact').textContent = driver.contact || '-';
            document.getElementById('findDriver-details').style.display = 'block';
            showAlert('findDriver-alert', 'Driver found!', 'success');
        } else {
            document.getElementById('findDriver-details').style.display = 'none';
            showAlert('findDriver-alert', data.message || 'Driver not found', 'error');
        }
    } catch (error) {
        console.error('Error finding driver:', error);
        document.getElementById('findDriver-details').style.display = 'none';
        showAlert('findDriver-alert', 'Error: ' + error.message, 'error');
    } finally {
        setLoading('findDriver-loading', false);
    }
}

// Delete Driver Handler
async function handleDeleteDriver(event) {
    event.preventDefault();
    
    const driverId = document.getElementById('deleteDriverId').value;
    
    // Confirmation dialog
    if (!confirm(`Are you sure you want to delete driver with ID ${driverId}? This action cannot be undone.`)) {
        return;
    }

    setLoading('deleteDriver-loading', true);
    
    try {
        const response = await fetch(`${API_BASE_URL}/deletedriver/${driverId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        console.log('Delete Driver Response:', response.status, data);

        if (response.ok) {
            showAlert('deleteDriver-alert', 'Driver deleted successfully!', 'success');
            document.getElementById('deleteDriverForm').reset();
            setTimeout(() => {
                closeForm('deleteDriver');
            }, 1500);
        } else {
            showAlert('deleteDriver-alert', data.message || 'Failed to delete driver', 'error');
        }
    } catch (error) {
        console.error('Error deleting driver:', error);
        showAlert('deleteDriver-alert', 'Error: ' + error.message, 'error');
    } finally {
        setLoading('deleteDriver-loading', false);
    }
}

// Update Driver by Truck/Carrier Handler
async function handleUpdateDriverByTruck(event) {
    event.preventDefault();
    
    const truckCarrierId = document.getElementById('truckCarrierId').value;
    setLoading('updateDriverByTruck-loading', true);
    
    try {
        const response = await fetch(`${API_BASE_URL}/updatingdriverbytruckCarrier/${truckCarrierId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        console.log('Update Driver by Truck/Carrier Response:', response.status, data);
        console.log('Full Response Object:', JSON.stringify(data, null, 2));

        if (response.ok) {
            // Try to get driver data from different possible locations
            let driver = data.data || data || {};
            
            console.log('Driver object:', driver);
            
            // Display the driver details
            document.getElementById('updateDetailId').textContent = driver.id !== undefined && driver.id !== null ? driver.id : '-';
            document.getElementById('updateDetailName').textContent = driver.name !== undefined && driver.name !== null ? driver.name : '-';
            document.getElementById('updateDetailContact').textContent = driver.contact !== undefined && driver.contact !== null ? driver.contact : '-';
            
            // Display truck details
            const truck = driver.truck || {};
            document.getElementById('updateDetailTruckId').textContent = truck.id !== undefined && truck.id !== null ? truck.id : '-';
            document.getElementById('updateDetailTruckName').textContent = truck.name !== undefined && truck.name !== null ? truck.name : '-';
            document.getElementById('updateDetailTruckCapacity').textContent = truck.capacity !== undefined && truck.capacity !== null ? truck.capacity : '-';
            
            // Display carrier details
            const carrier = driver.carrier || {};
            document.getElementById('updateDetailCarrierId').textContent = carrier.id !== undefined && carrier.id !== null ? carrier.id : '-';
            document.getElementById('updateDetailCarrierName').textContent = carrier.name !== undefined && carrier.name !== null ? carrier.name : '-';
            document.getElementById('updateDetailCarrierContact').textContent = carrier.contact !== undefined && carrier.contact !== null ? carrier.contact : '-';
            
            // Show the details section
            document.getElementById('updateDriverByTruck-details').style.display = 'block';
            
            showAlert('updateDriverByTruck-alert', 'Driver updated successfully!', 'success');
        } else {
            document.getElementById('updateDriverByTruck-details').style.display = 'none';
            showAlert('updateDriverByTruck-alert', data.message || 'Failed to update driver', 'error');
        }
    } catch (error) {
        console.error('Error updating driver:', error);
        document.getElementById('updateDriverByTruck-details').style.display = 'none';
        showAlert('updateDriverByTruck-alert', 'Error: ' + error.message, 'error');
    } finally {
        setLoading('updateDriverByTruck-loading', false);
    }
}

// ===== TRUCK HANDLERS =====

// Save Truck Handler
async function handleSaveTruck(event) {
    event.preventDefault();
    
    const truckData = {
        id: document.getElementById('truckId').value,
        name: document.getElementById('truckName').value,
        capacity: document.getElementById('truckCapacity').value
    };

    setLoading('saveTruck-loading', true);
    
    try {
        const response = await fetch(`${API_BASE_URL}/savetruckdetails`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(truckData)
        });

        const data = await response.json();
        console.log('Save Truck Response:', response.status, data);

        if (response.ok) {
            showAlert('saveTruck-alert', 'Truck saved successfully!', 'success');
            document.getElementById('saveTruckForm').reset();
            setTimeout(() => {
                closeForm('saveTruck');
            }, 1500);
        } else {
            showAlert('saveTruck-alert', data.message || 'Failed to save truck', 'error');
        }
    } catch (error) {
        console.error('Error saving truck:', error);
        showAlert('saveTruck-alert', 'Error: ' + error.message, 'error');
    } finally {
        setLoading('saveTruck-loading', false);
    }
}

// Find Truck Handler
async function handleFindTruck(event) {
    event.preventDefault();
    
    const truckId = document.getElementById('findTruckId').value;
    setLoading('findTruck-loading', true);
    
    try {
        const response = await fetch(`${API_BASE_URL}/findtruckid/${truckId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        console.log('Find Truck Response:', response.status, data);

        if (response.ok && data.data) {
            const truck = data.data;
            document.getElementById('detailTruckId').textContent = truck.id || '-';
            document.getElementById('detailTruckName').textContent = truck.name || '-';
            document.getElementById('detailTruckCapacity').textContent = truck.capacity || '-';
            document.getElementById('findTruck-details').style.display = 'block';
            showAlert('findTruck-alert', 'Truck found!', 'success');
        } else {
            document.getElementById('findTruck-details').style.display = 'none';
            showAlert('findTruck-alert', data.message || 'Truck not found', 'error');
        }
    } catch (error) {
        console.error('Error finding truck:', error);
        document.getElementById('findTruck-details').style.display = 'none';
        showAlert('findTruck-alert', 'Error: ' + error.message, 'error');
    } finally {
        setLoading('findTruck-loading', false);
    }
}

// Delete Truck Handler
async function handleDeleteTruck(event) {
    event.preventDefault();
    
    const truckId = document.getElementById('deleteTruckId').value;
    
    // Confirmation dialog
    if (!confirm(`Are you sure you want to delete truck with ID ${truckId}? This action cannot be undone.`)) {
        return;
    }

    setLoading('deleteTruck-loading', true);
    
    try {
        const response = await fetch(`${API_BASE_URL}/deletetruckid/${truckId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        console.log('Delete Truck Response:', response.status, data);

        if (response.ok) {
            showAlert('deleteTruck-alert', 'Truck deleted successfully!', 'success');
            document.getElementById('deleteTruckForm').reset();
            setTimeout(() => {
                closeForm('deleteTruck');
            }, 1500);
        } else {
            showAlert('deleteTruck-alert', data.message || 'Failed to delete truck', 'error');
        }
    } catch (error) {
        console.error('Error deleting truck:', error);
        showAlert('deleteTruck-alert', 'Error: ' + error.message, 'error');
    } finally {
        setLoading('deleteTruck-loading', false);
    }
}

// Update Truck by Carrier Handler
async function handleUpdateTruckByCarrier(event) {
    event.preventDefault();
    
    const carrierId = document.getElementById('updateTruckCarrierId').value;
    setLoading('updateTruckByCarrier-loading', true);
    
    try {
        const response = await fetch(`${API_BASE_URL}/updatetruckcarrier/${carrierId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        console.log('Update Truck by Carrier Response:', response.status, data);
        console.log('Full Response Object:', JSON.stringify(data, null, 2));

        if (response.ok) {
            let truck = data.data || data || {};
            
            console.log('Truck object:', truck);
            
            // Display the truck details
            document.getElementById('updateTruckDetailId').textContent = truck.id !== undefined && truck.id !== null ? truck.id : '-';
            document.getElementById('updateTruckDetailName').textContent = truck.name !== undefined && truck.name !== null ? truck.name : '-';
            document.getElementById('updateTruckDetailCapacity').textContent = truck.capacity !== undefined && truck.capacity !== null ? truck.capacity : '-';
            
            // Display carrier details
            const carrier = truck.carrier || {};
            document.getElementById('updateTruckCarrierDetailId').textContent = carrier.id !== undefined && carrier.id !== null ? carrier.id : '-';
            document.getElementById('updateTruckCarrierDetailName').textContent = carrier.name !== undefined && carrier.name !== null ? carrier.name : '-';
            document.getElementById('updateTruckCarrierDetailContact').textContent = carrier.contact !== undefined && carrier.contact !== null ? carrier.contact : '-';
            
            // Show the details section
            document.getElementById('updateTruckByCarrier-details').style.display = 'block';
            
            showAlert('updateTruckByCarrier-alert', 'Truck updated successfully!', 'success');
        } else {
            document.getElementById('updateTruckByCarrier-details').style.display = 'none';
            showAlert('updateTruckByCarrier-alert', data.message || 'Failed to update truck', 'error');
        }
    } catch (error) {
        console.error('Error updating truck:', error);
        document.getElementById('updateTruckByCarrier-details').style.display = 'none';
        showAlert('updateTruckByCarrier-alert', 'Error: ' + error.message, 'error');
    } finally {
        setLoading('updateTruckByCarrier-loading', false);
    }
}

// ===== CARRIER HANDLERS =====

// Save Carrier Handler
async function handleSaveCarrier(event) {
    event.preventDefault();
    
    const carrierData = {
        id: document.getElementById('carrierId').value,
        name: document.getElementById('carrierName').value,
        contact: document.getElementById('carrierContact').value
    };

    setLoading('saveCarrier-loading', true);
    
    try {
        const response = await fetch(`${API_BASE_URL}/savecarrier`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(carrierData)
        });

        const data = await response.json();
        console.log('Save Carrier Response:', response.status, data);

        if (response.ok) {
            showAlert('saveCarrier-alert', 'Carrier saved successfully!', 'success');
            document.getElementById('saveCarrierForm').reset();
            setTimeout(() => {
                closeForm('saveCarrier');
            }, 1500);
        } else {
            showAlert('saveCarrier-alert', data.message || 'Failed to save carrier', 'error');
        }
    } catch (error) {
        console.error('Error saving carrier:', error);
        showAlert('saveCarrier-alert', 'Error: ' + error.message, 'error');
    } finally {
        setLoading('saveCarrier-loading', false);
    }
}

// Find Carrier Handler
async function handleFindCarrier(event) {
    event.preventDefault();
    
    const carrierId = document.getElementById('findCarrierId').value;
    setLoading('findCarrier-loading', true);
    
    try {
        const response = await fetch(`${API_BASE_URL}/findcarrier/${carrierId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        console.log('Find Carrier Response:', response.status, data);

        if (response.ok && data.data) {
            const carrier = data.data;
            document.getElementById('detailCarrierId').textContent = carrier.id || '-';
            document.getElementById('detailCarrierName').textContent = carrier.name || '-';
            document.getElementById('detailCarrierContact').textContent = carrier.contact || '-';
            document.getElementById('findCarrier-details').style.display = 'block';
            showAlert('findCarrier-alert', 'Carrier found!', 'success');
        } else {
            document.getElementById('findCarrier-details').style.display = 'none';
            showAlert('findCarrier-alert', data.message || 'Carrier not found', 'error');
        }
    } catch (error) {
        console.error('Error finding carrier:', error);
        document.getElementById('findCarrier-details').style.display = 'none';
        showAlert('findCarrier-alert', 'Error: ' + error.message, 'error');
    } finally {
        setLoading('findCarrier-loading', false);
    }
}

// Delete Carrier Handler
async function handleDeleteCarrier(event) {
    event.preventDefault();
    
    const carrierId = document.getElementById('deleteCarrierId').value;
    
    // Confirmation dialog
    if (!confirm(`Are you sure you want to delete carrier with ID ${carrierId}? This action cannot be undone.`)) {
        return;
    }

    setLoading('deleteCarrier-loading', true);
    
    try {
        const response = await fetch(`${API_BASE_URL}/deletecarrier/${carrierId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        console.log('Delete Carrier Response:', response.status, data);

        if (response.ok) {
            showAlert('deleteCarrier-alert', 'Carrier deleted successfully!', 'success');
            document.getElementById('deleteCarrierForm').reset();
            setTimeout(() => {
                closeForm('deleteCarrier');
            }, 1500);
        } else {
            showAlert('deleteCarrier-alert', data.message || 'Failed to delete carrier', 'error');
        }
    } catch (error) {
        console.error('Error deleting carrier:', error);
        showAlert('deleteCarrier-alert', 'Error: ' + error.message, 'error');
    } finally {
        setLoading('deleteCarrier-loading', false);
    }
}

// ===== ADDRESS HANDLERS =====

// Save Address Handler
async function handleSaveAddress(event) {
    event.preventDefault();
    
    const addressData = {
        id: document.getElementById('addressId').value,
        street: document.getElementById('addressStreet').value,
        city: document.getElementById('addressCity').value,
        pincode: document.getElementById('addressPincode').value,
        state: document.getElementById('addressState').value
    };

    setLoading('saveAddress-loading', true);
    
    try {
        const response = await fetch(`${API_BASE_URL}/saveadress`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(addressData)
        });

        const data = await response.json();
        console.log('Save Address Response:', response.status, data);

        if (response.ok) {
            showAlert('saveAddress-alert', 'Address saved successfully!', 'success');
            document.getElementById('saveAddressForm').reset();
            setTimeout(() => {
                closeForm('saveAddress');
            }, 1500);
        } else {
            showAlert('saveAddress-alert', data.message || 'Failed to save address', 'error');
        }
    } catch (error) {
        console.error('Error saving address:', error);
        showAlert('saveAddress-alert', 'Error: ' + error.message, 'error');
    } finally {
        setLoading('saveAddress-loading', false);
    }
}

// Find Address Handler
async function handleFindAddress(event) {
    event.preventDefault();
    
    const addressId = document.getElementById('findAddressId').value;
    setLoading('findAddress-loading', true);
    
    try {
        const response = await fetch(`${API_BASE_URL}/findadress/${addressId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        console.log('Find Address Response:', response.status, data);

        if (response.ok && data.data) {
            const address = data.data;
            document.getElementById('detailAddressId').textContent = address.id || '-';
            document.getElementById('detailAddressStreet').textContent = address.street || '-';
            document.getElementById('detailAddressCity').textContent = address.city || '-';
            document.getElementById('detailAddressPincode').textContent = address.pincode || '-';
            document.getElementById('detailAddressState').textContent = address.state || '-';
            document.getElementById('findAddress-details').style.display = 'block';
            showAlert('findAddress-alert', 'Address found!', 'success');
        } else {
            document.getElementById('findAddress-details').style.display = 'none';
            showAlert('findAddress-alert', data.message || 'Address not found', 'error');
        }
    } catch (error) {
        console.error('Error finding address:', error);
        document.getElementById('findAddress-details').style.display = 'none';
        showAlert('findAddress-alert', 'Error: ' + error.message, 'error');
    } finally {
        setLoading('findAddress-loading', false);
    }
}

// Delete Address Handler
async function handleDeleteAddress(event) {
    event.preventDefault();
    
    const addressId = document.getElementById('deleteAddressId').value;
    
    // Confirmation dialog
    if (!confirm(`Are you sure you want to delete address with ID ${addressId}? This action cannot be undone.`)) {
        return;
    }

    setLoading('deleteAddress-loading', true);
    
    try {
        const response = await fetch(`${API_BASE_URL}/deleteAdress/${addressId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        console.log('Delete Address Response:', response.status, data);

        if (response.ok) {
            showAlert('deleteAddress-alert', 'Address deleted successfully!', 'success');
            document.getElementById('deleteAddressForm').reset();
            setTimeout(() => {
                closeForm('deleteAddress');
            }, 1500);
        } else {
            showAlert('deleteAddress-alert', data.message || 'Failed to delete address', 'error');
        }
    } catch (error) {
        console.error('Error deleting address:', error);
        showAlert('deleteAddress-alert', 'Error: ' + error.message, 'error');
    } finally {
        setLoading('deleteAddress-loading', false);
    }
}

// Update Carrier by Truck ID Handler
async function handleUpdateCarrierByTruckId(event) {
    event.preventDefault();
    
    const orderId = document.getElementById('orderIdForCarrier').value;
    const truckId = document.getElementById('truckIdForCarrier').value;

    setLoading('updateCarrierByTruckId-loading', true);
    
    try {
        const response = await fetch(`${API_BASE_URL}/updateorderassigncarrie/${orderId}/bytruckid/${truckId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        console.log('Update Carrier by Truck ID Response:', response.status, data);

        if (response.ok) {
            const order = data.data || data;
            const carrier = order.carrier || {};
            const cargo = order.cargo || {};
            const loading = order.loading || {};
            const unloading = order.unloading || {};
            const loadingAddress = loading.adress || {};
            const unloadingAddress = unloading.adress || {};
            const truck = order.truck || {};
            const driver = order.driver || {};
            
            console.log('Order:', order);
            console.log('Carrier:', carrier);
            console.log('Loading Address:', loadingAddress);
            console.log('Unloading Address:', unloadingAddress);
            
            // Order Details
            document.getElementById('carrierOrderId').textContent = order.id || 'N/A';
            document.getElementById('carrierOrderStatus').textContent = order.status || 'N/A';
            
            // Cargo Details
            document.getElementById('carrierCargoId').textContent = cargo.id || 'N/A';
            document.getElementById('carrierCargoName').textContent = cargo.name || 'N/A';
            document.getElementById('carrierCargoDescription').textContent = cargo.discription || 'N/A';
            document.getElementById('carrierCargoWeight').textContent = cargo.weight || 'N/A';
            document.getElementById('carrierCargoCount').textContent = cargo.count || 'N/A';
            
            // Loading Address
            document.getElementById('carrierLoadingStreet').textContent = loadingAddress.street || 'N/A';
            document.getElementById('carrierLoadingCity').textContent = loadingAddress.city || 'N/A';
            document.getElementById('carrierLoadingPincode').textContent = loadingAddress.pincode || 'N/A';
            document.getElementById('carrierLoadingState').textContent = loadingAddress.state || 'N/A';
            
            // Unloading Address
            document.getElementById('carrierUnloadingStreet').textContent = unloadingAddress.street || 'N/A';
            document.getElementById('carrierUnloadingCity').textContent = unloadingAddress.city || 'N/A';
            document.getElementById('carrierUnloadingPincode').textContent = unloadingAddress.pincode || 'N/A';
            document.getElementById('carrierUnloadingState').textContent = unloadingAddress.state || 'N/A';
            
            // Truck Details
            document.getElementById('carrierTruckId').textContent = truck.id || 'N/A';
            document.getElementById('carrierTruckName').textContent = truck.name || 'N/A';
            document.getElementById('carrierTruckCapacity').textContent = truck.capacity || 'N/A';
            
            // Driver Details
            document.getElementById('carrierDriverId').textContent = driver.id || 'N/A';
            document.getElementById('carrierDriverName').textContent = driver.name || 'N/A';
            document.getElementById('carrierDriverContact').textContent = driver.contact || 'N/A';
            
            // Carrier Details
            document.getElementById('carrierByTruckId').textContent = carrier.id || 'N/A';
            document.getElementById('carrierByTruckName').textContent = carrier.name || 'N/A';
            document.getElementById('carrierByTruckContact').textContent = carrier.contact || 'N/A';
            
            document.getElementById('updateCarrierByTruckId-details').style.display = 'block';
            showAlert('updateCarrierByTruckId-alert', 'Carrier assigned successfully!', 'success');
        } else {
            showAlert('updateCarrierByTruckId-alert', data.message || 'Failed to update carrier', 'error');
            document.getElementById('updateCarrierByTruckId-details').style.display = 'none';
        }
    } catch (error) {
        console.error('Error updating carrier:', error);
        showAlert('updateCarrierByTruckId-alert', 'Error: ' + error.message, 'error');
        document.getElementById('updateCarrierByTruckId-details').style.display = 'none';
    } finally {
        setLoading('updateCarrierByTruckId-loading', false);
    }
}

// Update Loading Unloading DateTime Handler
// Save Loading Location Handler
async function handleSaveLoadingLocation(event) {
    event.preventDefault();
    
    const loadingData = {
        id: document.getElementById('loadingLocationId').value
    };

    setLoading('saveLoadingLocation-loading', true);
    
    try {
        const response = await fetch(`${API_BASE_URL}/saveloadinglocation`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loadingData)
        });

        const data = await response.json();
        console.log('Save Loading Location Response:', response.status, data);

        if (response.ok) {
            const loading = data.data || data;
            document.getElementById('detailSaveLoadingLocationId').textContent = loading.id || 'N/A';
            document.getElementById('detailSaveLoadingLocationDate').textContent = loading.date || 'N/A';
            document.getElementById('detailSaveLoadingLocationTime').textContent = loading.time || 'N/A';
            document.getElementById('detailSaveLoadingLocationAddressId').textContent = loading.adress?.id || loading.addressId || 'N/A';
            
            document.getElementById('saveLoadingLocation-details').style.display = 'block';
            showAlert('saveLoadingLocation-alert', 'Loading location saved successfully!', 'success');
        } else {
            showAlert('saveLoadingLocation-alert', data.message || 'Failed to save loading location', 'error');
            document.getElementById('saveLoadingLocation-details').style.display = 'none';
        }
    } catch (error) {
        console.error('Error saving loading location:', error);
        showAlert('saveLoadingLocation-alert', 'Error: ' + error.message, 'error');
        document.getElementById('saveLoadingLocation-details').style.display = 'none';
    } finally {
        setLoading('saveLoadingLocation-loading', false);
    }
}

// Find Loading Location Handler
async function handleFindLoadingLocation(event) {
    event.preventDefault();
    
    const loadingLocationId = document.getElementById('findLoadingLocationId').value;
    setLoading('findLoadingLocation-loading', true);
    
    try {
        const response = await fetch(`${API_BASE_URL}/findinglocation/${loadingLocationId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        console.log('Find Loading Location Response:', response.status, data);

        if (response.ok && data.data) {
            const loading = data.data;
            document.getElementById('detailLoadingLocationId').textContent = loading.id || '-';
            document.getElementById('detailLoadingLocationDate').textContent = loading.date || '-';
            document.getElementById('detailLoadingLocationTime').textContent = loading.time || '-';
            document.getElementById('detailLoadingLocationAddressId').textContent = loading.adress?.id || loading.addressId || '-';
            document.getElementById('findLoadingLocation-details').style.display = 'block';
            showAlert('findLoadingLocation-alert', 'Loading location found!', 'success');
        } else {
            document.getElementById('findLoadingLocation-details').style.display = 'none';
            showAlert('findLoadingLocation-alert', data.message || 'Loading location not found', 'error');
        }
    } catch (error) {
        console.error('Error finding loading location:', error);
        document.getElementById('findLoadingLocation-details').style.display = 'none';
        showAlert('findLoadingLocation-alert', 'Error: ' + error.message, 'error');
    } finally {
        setLoading('findLoadingLocation-loading', false);
    }
}

// Delete Loading Location Handler
async function handleDeleteLoadingLocation(event) {
    event.preventDefault();
    
    const loadingLocationId = document.getElementById('deleteLoadingLocationId').value;
    
    // Confirmation dialog
    if (!confirm(`Are you sure you want to delete loading location with ID ${loadingLocationId}? This action cannot be undone.`)) {
        return;
    }

    setLoading('deleteLoadingLocation-loading', true);
    
    try {
        const response = await fetch(`${API_BASE_URL}/RemoveLocation/${loadingLocationId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        console.log('Delete Loading Location Response:', response.status, data);

        if (response.ok) {
            showAlert('deleteLoadingLocation-alert', 'Loading location deleted successfully!', 'success');
            document.getElementById('deleteLoadingLocationForm').reset();
            setTimeout(() => {
                closeForm('deleteLoadingLocation');
            }, 1500);
        } else {
            showAlert('deleteLoadingLocation-alert', data.message || 'Failed to delete loading location', 'error');
        }
    } catch (error) {
        console.error('Error deleting loading location:', error);
        showAlert('deleteLoadingLocation-alert', 'Error: ' + error.message, 'error');
    } finally {
        setLoading('deleteLoadingLocation-loading', false);
    }
}

// Unloading Location Handlers
async function handleSaveUnloadingLocation(event) {
    event.preventDefault();
    
    const unloadingLocationId = document.getElementById('unloadingLocationId').value;
    
    setLoading('saveUnloadingLocation-loading', true);
    
    try {
        const payload = {
            id: parseInt(unloadingLocationId)
        };

        const response = await fetch(`${API_BASE_URL}/saveunloadingadress`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        console.log('Save Unloading Location Response Status:', response.status);
        
        let result = null;
        const responseText = await response.text();
        console.log('Response Text:', responseText);
        
        if (responseText) {
            result = JSON.parse(responseText);
        } else {
            result = {};
        }

        if (response.ok) {
            showAlert('saveUnloadingLocation-alert', 'Unloading location saved successfully!', 'success');
            
            // Extract Unloading data from response structure
            const unloadingData = result.data || result;
            document.getElementById('detailSaveUnloadingLocationId').textContent = unloadingData.id || unloadingLocationId;
            document.getElementById('detailSaveUnloadingLocationDate').textContent = unloadingData.date || 'N/A';
            document.getElementById('detailSaveUnloadingLocationTime').textContent = unloadingData.time || 'N/A';
            document.getElementById('detailSaveUnloadingLocationAddressId').textContent = unloadingData.adress?.id || 'N/A';
            
            document.getElementById('saveUnloadingLocation-details').style.display = 'block';
            document.getElementById('saveUnloadingLocationForm').reset();
        } else {
            showAlert('saveUnloadingLocation-alert', result.message || 'Failed to save unloading location', 'error');
        }
    } catch (error) {
        console.error('Error saving unloading location:', error);
        showAlert('saveUnloadingLocation-alert', 'Error: ' + error.message, 'error');
    } finally {
        setLoading('saveUnloadingLocation-loading', false);
    }
}

async function handleFindUnloadingLocation(event) {
    event.preventDefault();
    
    const unloadingLocationId = document.getElementById('findUnloadingLocationId').value;
    
    setLoading('findUnloadingLocation-loading', true);
    
    try {
        const response = await fetch(`${API_BASE_URL}/finddeliverAdress/${unloadingLocationId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log('Find Unloading Location Response Status:', response.status);
        
        let result = null;
        const responseText = await response.text();
        console.log('Response Text:', responseText);
        
        if (responseText) {
            result = JSON.parse(responseText);
        } else {
            result = {};
        }

        if (response.ok) {
            showAlert('findUnloadingLocation-alert', 'Unloading location found!', 'success');
            
            // Extract Address data from response structure
            const addressData = result.data || result;
            document.getElementById('detailUnloadingLocationId').textContent = addressData.id || 'N/A';
            document.getElementById('detailUnloadingLocationStreet').textContent = addressData.street || 'N/A';
            document.getElementById('detailUnloadingLocationCity').textContent = addressData.city || 'N/A';
            document.getElementById('detailUnloadingLocationPincode').textContent = addressData.pincode || 'N/A';
            document.getElementById('detailUnloadingLocationState').textContent = addressData.state || 'N/A';
            
            document.getElementById('findUnloadingLocation-details').style.display = 'block';
        } else {
            showAlert('findUnloadingLocation-alert', result.message || 'Unloading location not found', 'error');
            document.getElementById('findUnloadingLocation-details').style.display = 'none';
        }
    } catch (error) {
        console.error('Error finding unloading location:', error);
        showAlert('findUnloadingLocation-alert', 'Error: ' + error.message, 'error');
    } finally {
        setLoading('findUnloadingLocation-loading', false);
    }
}

async function handleDeleteUnloadingLocation(event) {
    event.preventDefault();
    
    const unloadingLocationId = document.getElementById('deleteUnloadingLocationId').value;
    
    // Confirmation dialog
    if (!confirm(`Are you sure you want to delete unloading location with ID ${unloadingLocationId}? This action cannot be undone.`)) {
        return;
    }

    setLoading('deleteUnloadingLocation-loading', true);
    
    try {
        const response = await fetch(`${API_BASE_URL}/cancle/${unloadingLocationId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log('Delete Unloading Location Response Status:', response.status);
        
        let result = null;
        const responseText = await response.text();
        console.log('Response Text:', responseText);
        
        if (responseText) {
            result = JSON.parse(responseText);
        } else {
            result = {};
        }

        if (response.ok) {
            showAlert('deleteUnloadingLocation-alert', 'Unloading location deleted successfully!', 'success');
            document.getElementById('deleteUnloadingLocationForm').reset();
            setTimeout(() => {
                closeForm('deleteUnloadingLocation');
            }, 1500);
        } else {
            showAlert('deleteUnloadingLocation-alert', result.message || 'Failed to delete unloading location', 'error');
        }
    } catch (error) {
        console.error('Error deleting unloading location:', error);
        showAlert('deleteUnloadingLocation-alert', 'Error: ' + error.message, 'error');
    } finally {
        setLoading('deleteUnloadingLocation-loading', false);
    }
}

// Users Management Handlers
async function handleGetAllUsers(event) {
    event.preventDefault();
    
    const adminPhone = document.getElementById('adminPhoneInput').value;
    console.log('Admin Phone:', adminPhone);
    console.log('API URL:', `${API_BASE_URL}/allusers/${adminPhone}`);
    
    setLoading('getAllUsers-loading', true);
    
    try {
        const response = await fetch(`${API_BASE_URL}/allusers/${adminPhone}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log('Response Status:', response.status);
        
        let result = null;
        const responseText = await response.text();
        console.log('Raw Response:', responseText);
        
        if (responseText) {
            try {
                result = JSON.parse(responseText);
            } catch (parseError) {
                console.error('JSON Parse Error:', parseError);
                showAlert('getAllUsers-alert', 'Invalid response format from server', 'error');
                setLoading('getAllUsers-loading', false);
                return;
            }
        } else {
            result = [];
        }

        if (response.ok) {
            // Handle both direct array and wrapped response
            let usersList = [];
            if (Array.isArray(result)) {
                usersList = result;
            } else if (result && Array.isArray(result.data)) {
                usersList = result.data;
            } else if (result && typeof result === 'object') {
                usersList = [result];
            }
            
            console.log('Logged In Users:', usersList);
            
            if (!usersList || usersList.length === 0) {
                showAlert('getAllUsers-alert', 'No logged-in users found for this admin', 'info');
                document.getElementById('getAllUsers-details').style.display = 'none';
            } else {
                showAlert('getAllUsers-alert', `Found ${usersList.length} logged-in user(s)!`, 'success');
                
                // Display users in a table format
                let userHTML = '<table style="width: 100%; border-collapse: collapse; margin-top: 10px;">';
                userHTML += '<tr style="background: #f0f0f0;"><th style="padding: 10px; text-align: left; border: 1px solid #ddd;">User ID</th><th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Email</th><th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Password</th></tr>';
                
                usersList.forEach(user => {
                    userHTML += '<tr>';
                    userHTML += `<td style="padding: 10px; border: 1px solid #ddd;">${user.id || 'N/A'}</td>`;
                    userHTML += `<td style="padding: 10px; border: 1px solid #ddd;">${user.email || 'N/A'}</td>`;
                    userHTML += `<td style="padding: 10px; border: 1px solid #ddd;">${user.password || 'N/A'}</td>`;
                    userHTML += '</tr>';
                });
                
                userHTML += '</table>';
                document.getElementById('usersList').innerHTML = userHTML;
                document.getElementById('getAllUsers-details').style.display = 'block';
            }
        } else {
            const errorMsg = result?.message || result?.error || `Server Error ${response.status}`;
            console.error('API Error:', errorMsg);
            showAlert('getAllUsers-alert', 'Failed to load users: ' + errorMsg, 'error');
            document.getElementById('getAllUsers-details').style.display = 'none';
        }
    } catch (error) {
        console.error('Fetch Error:', error);
        showAlert('getAllUsers-alert', 'Error: ' + error.message, 'error');
        document.getElementById('getAllUsers-details').style.display = 'none';
    } finally {
        setLoading('getAllUsers-loading', false);
    }
}

async function handleBlockUser(event) {
    event.preventDefault();
    
    const userEmail = document.getElementById('deleteUserEmail').value;
    
    // Confirmation dialog
    if (!confirm(`Are you sure you want to delete user with email ${userEmail}? This action cannot be undone.`)) {
        return;
    }

    setLoading('blockUser-loading', true);
    
    try {
        const response = await fetch(`${API_BASE_URL}/deletinguser/${userEmail}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log('Delete User Response Status:', response.status);
        
        let result = null;
        const responseText = await response.text();
        console.log('Response Text:', responseText);
        
        if (responseText) {
            result = JSON.parse(responseText);
        } else {
            result = {};
        }

        if (response.ok) {
            showAlert('blockUser-alert', 'User deleted successfully!', 'success');
            document.getElementById('blockUserForm').reset();
            setTimeout(() => {
                closeForm('blockUser');
            }, 1500);
        } else {
            showAlert('blockUser-alert', result.message || 'Failed to delete user', 'error');
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        showAlert('blockUser-alert', 'Error: ' + error.message, 'error');
    } finally {
        setLoading('blockUser-loading', false);
    }
}
