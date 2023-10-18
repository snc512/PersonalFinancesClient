import React, { Component } from 'react';
import api from "../../api/axiosConfig";
import 'font-awesome/css/font-awesome.min.css';
import AddExpenseModal from './AddExpenseModal';


class Expenses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddExpenseModalOpen: false,
      expenses: [],
      sortBy: 'transDate',
      sortDirection: 'ASC'
    };
  }

  handleSort = async (column) => {
    const { sortBy, sortDirection } = this.state;
  
    const newSortDirection = sortBy === column ? (sortDirection === 'ASC' ? 'DESC' : 'ASC') : 'ASC';
  
    this.setState({ sortBy: column, sortDirection: newSortDirection });
    try {
      const response = await api.get('/api/v1/expenses', {
        params: {
          sortBy: column,
          sortDirection: newSortDirection,
        }
      });
  
      this.setState({ expenses: response.data });
    } catch (error) {
      console.error('Error fetching sorted expenses:', error);
    }
  };

  toggleAddExpenseModal = () => {
    this.setState((prevState) => ({
      isAddExpenseModalOpen: !prevState.isAddExpenseModalOpen,
    }));
  };

  async componentDidMount() {
    try {
      const response = await api.get('/api/v1/expenses', {
        params: {
          sortBy: 'transDate',
          sortDirection: 'ASC',
        }
      });
      console.log(response.data[0].category);
      response.data.map((expense) => (
        console.log(expense.transDate)
      ));
      this.setState({ expenses: response.data });
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  }

  renderSortIcon(column) {
    const { sortBy, sortDirection } = this.state;
    if (sortBy === column) {
      if (sortDirection === 'DESC') {
        return <i className="fa fa-sort-up" aria-hidden="true"></i>;
      } else {
        return <i className="fa fa-sort-down" aria-hidden="true"></i>;
      }
    }
    return null;
  }

  render() {
    const { expenses } = this.state;

    return (
      <div className=' px-10 py-10 w-full text-center flex flex-col justify-center'>
        <div className='pb-8'>
          <button
            className='bg-[#0b3b2c] text-white px-4 py-2 rounded mt-4'
            onClick={this.toggleAddExpenseModal}
          >
            Add Expense
          </button>

          <AddExpenseModal
            isOpen={this.state.isAddExpenseModalOpen}
            onClose={this.toggleAddExpenseModal}
          />

        </div>

        <h1 className='text-white md:text-4xl sm:text-3xl text-xl font-bold md:py-6'>Expenses</h1>
        <table>
          <thead>
            <tr className='text-[#00df9a] md:text-xl sm:text-sm text-sm font-bold'>
              <th onClick={() => this.handleSort('card')}>Card Last 4</th>
              <th onClick={() => this.handleSort('transDate')}>Transaction Date {this.renderSortIcon('transDate')}</th>
              <th onClick={() => this.handleSort('referenceNumber')}>Reference Number {this.renderSortIcon('referenceNumber')}</th>
              <th onClick={() => this.handleSort('description')}>Description {this.renderSortIcon('description')}</th>
              <th onClick={() => this.handleSort('category')}>Category {this.renderSortIcon('category')}</th>
              <th onClick={() => this.handleSort('credits')}>Credits {this.renderSortIcon('credits')}</th>
              <th onClick={() => this.handleSort('charges')}>Charges {this.renderSortIcon('charges')}</th>
            </tr>
          </thead>
          <tbody className='text-white  md:text-xl sm:text-sm text-sm pl-2'>
            {expenses.map((expense, index) => (
              <tr key={index}>
                <td className= 'border border-gray-600'>{expense.cardLast4}</td>
                <td className= 'border border-gray-600'>{new Date(expense.transDate).toLocaleDateString()}</td>
                <td className= 'border border-gray-600'>{expense.referenceNumber}</td>
                <td className= 'border border-gray-600'>{expense.description}</td>
                <td className= 'border border-gray-600'>{expense.category?.name ?? ''}</td>
                <td className= 'border border-gray-600'>{expense.credits}</td>
                <td className= 'border border-gray-600'>{expense.charges}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Expenses;
