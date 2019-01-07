---
layout: post
title: 分数绩点计算器
---
<style>
    input {
        width: calc(100% + 2px);
        height: 1.8em;
        margin: -1px;
        text-align: center;
        font-weight: bold;
    }
</style>

这是一个分数与绩点相互转换的页面。绩点精确到小数点后三位，分数精确到小数点后两位。如果您觉得这个页面有用，欢迎收藏。

<table class="listTable">
    <tr>
        <th>课程分数</th>
        <th>绩点</th>
    </tr>
    <tr>
        <td>
            <input onkeyup="_实时绩点.innerHTML=_分2绩(this.value)" placeholder="分数">
        </td>
        <td id="_实时绩点">左侧输入分数</td>
    </tr>
    <tr>
        <td id="_实时分数">右侧输入绩点</td>
        <td>
            <input onkeyup="_实时分数.innerHTML=_绩2分(this.value)" placeholder="绩点">
        </td>
    </tr>
    <tr>
        <td>100</td>
        <td>4.00</td>
    </tr>
    <tr>
        <td>99</td>
        <td>4.00</td>
    </tr>
    <tr>
        <td>98</td>
        <td>3.99</td>
    </tr>
    <tr>
        <td>97</td>
        <td>3.98</td>
    </tr>
    <tr>
        <td>96</td>
        <td>3.97</td>
    </tr>
    <tr>
        <td>95</td>
        <td>3.95</td>
    </tr>
    <tr>
        <td>94</td>
        <td>3.93</td>
    </tr>
    <tr>
        <td>93</td>
        <td>3.91</td>
    </tr>
    <tr>
        <td>92</td>
        <td>3.88</td>
    </tr>
    <tr>
        <td>91</td>
        <td>3.85</td>
    </tr>
    <tr>
        <td>90</td>
        <td>3.81</td>
    </tr>
    <tr>
        <td>89</td>
        <td>3.77</td>
    </tr>
    <tr>
        <td>88</td>
        <td>3.73</td>
    </tr>
    <tr>
        <td>87</td>
        <td>3.68</td>
    </tr>
    <tr>
        <td>86</td>
        <td>3.63</td>
    </tr>
    <tr>
        <td>85</td>
        <td>3.58</td>
    </tr>
    <tr>
        <td>84</td>
        <td>3.52</td>
    </tr>
    <tr>
        <td>83</td>
        <td>3.46</td>
    </tr>
    <tr>
        <td>82</td>
        <td>3.39</td>
    </tr>
    <tr>
        <td>81</td>
        <td>3.32</td>
    </tr>
    <tr>
        <td>80</td>
        <td>3.25</td>
    </tr>
    <tr>
        <td>79</td>
        <td>3.17</td>
    </tr>
    <tr>
        <td>78</td>
        <td>3.09</td>
    </tr>
    <tr>
        <td>77</td>
        <td>3.01</td>
    </tr>
    <tr>
        <td>76</td>
        <td>2.92</td>
    </tr>
    <tr>
        <td>75</td>
        <td>2.83</td>
    </tr>
    <tr>
        <td>74</td>
        <td>2.73</td>
    </tr>
    <tr>
        <td>73</td>
        <td>2.63</td>
    </tr>
    <tr>
        <td>72</td>
        <td>2.53</td>
    </tr>
    <tr>
        <td>71</td>
        <td>2.42</td>
    </tr>
    <tr>
        <td>70</td>
        <td>2.31</td>
    </tr>
    <tr>
        <td>69</td>
        <td>2.20</td>
    </tr>
    <tr>
        <td>68</td>
        <td>2.08</td>
    </tr>
    <tr>
        <td>67</td>
        <td>1.96</td>
    </tr>
    <tr>
        <td>66</td>
        <td>1.83</td>
    </tr>
    <tr>
        <td>65</td>
        <td>1.70</td>
    </tr>
    <tr>
        <td>64</td>
        <td>1.57</td>
    </tr>
    <tr>
        <td>63</td>
        <td>1.43</td>
    </tr>
    <tr>
        <td>62</td>
        <td>1.29</td>
    </tr>
    <tr>
        <td>61</td>
        <td>1.15</td>
    </tr>
    <tr>
        <td style="border-bottom-left-radius: 8px;">60</td>
        <td style="border-bottom-right-radius: 8px;">1.00</td>
    </tr>
</table>
<div>&copy; 2018 Xzonn</div>
<script>
    function _分2绩(x) {
        if (isNaN(x) || (x < 0) || (x > 100)) {
            return "出现错误";
        }
        if (x < 60) {
            return "0.000";
        }
        return (4 - 3 * (100 - x) * (100 - x) / 1600).toFixed(3);
    }

    function _绩2分(x) {
        if (!x) {
            return "[0,60)";
        }
        if (isNaN(x) || (x < 1) || (x > 4)) {
            return "出现错误";
        }
        return (100 - Math.sqrt(1600 * (4 - x) / 3)).toFixed(2);
    }
</script>